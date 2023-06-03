'''
Author: Advey Nandan
Last Modified: June 2, 2023
DJANGO VERSION 4.1.5

ASGI settings for websocket
Referred to: https://channels.readthedocs.io/en/stable/ --> Used partially
'''
import json

from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from finalproject.models import Message, Room, Notifications, Person

class ChatConsumer(AsyncWebsocketConsumer):
    '''
    Defines functionality for chat user 
    '''
    async def connect(self):
        '''
        Accepts websocket connection and obtains room name and group name
        
        Args:
            self: ChatConsumer
        '''
        self.room_name = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = "chat_%s" % self.room_name

        # Join room group
        await self.channel_layer.group_add(
            self.room_group_name, self.channel_name
        )
            
        await self.accept()

        

    async def disconnect(self, close_code):
        '''
        Disconnect from chat properties
        
        Args:
            self: ChatConsumer
            close_code: Integer
        '''
        # Leave room group
        await self.channel_layer.group_discard(
            self.room_group_name, self.channel_name
        )
    

    @database_sync_to_async
    def create_message(self, message, username):
        '''
        Creates message through database

        Args:
            self: ChatConsumer
            message: String
            username: String
        returns:
            Message object
        '''
        print("socket", self.room_name)
        r = Room.objects.get(name=self.room_name)
    

        message_obj = Message.objects.create(
            content=message,
            username=username,
            room=r,
        ) 
        return message_obj
    
    @database_sync_to_async
    def create_notif(self, user, user2):
        '''
        Creates a notification through database
        
        Args:
            self: ChatConsumer
            user: Person 
            user2: Integer
        '''
        try:
            n = Notifications.objects.get(user = user, user2=user2)
        
        except Notifications.DoesNotExist:
            notif_obj = Notifications.objects.create(user=user, user2=user2)
        

    @database_sync_to_async
    def get_person(self, user):
        '''
        Gets person object with id

        Args:
            self: ChatConsumer
            user: Integer
        Returns:
            Person object

        '''
        return Person.objects.get(id=user)

    # Receive message from WebSocket
    async def receive(self, text_data):
        '''
        Recieves data from frontend, creates notifications and sends to the socket
        Args:
            self: ChatConsumer
            text_data: JSON
        '''
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        username = text_data_json["username"]
        u1 = text_data_json["user1"] 
        u2 = text_data_json["user2"]

        message_obj = await self.create_message(message, username)
        pers = await self.get_person(int(u1))
        pers2 = await self.get_person(int(u2))
        notif_obj = await self.create_notif(pers, int(u2))
        notif_obj2 = await self.create_notif(pers2, int(u1))

        # Send message to room group
        await self.channel_layer.group_send(
            self.room_group_name, {"type": "chat_message", "message": message, "username": username, "timestamp": str(message_obj.timestamp)}
        )
        

    # Receive message from room group
    async def chat_message(self, event):
        '''
        Sends chat message given the attributes
        Args:
            self: ChatConsumer
            event: dictionary

        '''
        message = event["message"]
        username = event['username']
        timestamp = event['timestamp']
        
        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": message, 'username': username, 'timestamp': timestamp}))