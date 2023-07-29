'''
Author: Advey Nandan
Last Modified: June 2, 2023
DJANGO VERSION 4.1.5

Django serializers for models (converts models to json/xml format)
'''
from rest_framework.serializers import ModelSerializer
from finalproject.models import UserModel, Person, Message, Reviews, Notifications


class UserSerializer(ModelSerializer):
    '''
    Serializer for User
    Parent Class: ModelSerializer
    Contained Classes: Meta 
    '''
    class Meta:
        model=UserModel
        fields = '__all__'

class PersonSerializer(ModelSerializer):
    '''
    Serializer for Person
    Parent Class: ModelSerializer
    Contained Classes: Meta 
    '''
    class Meta:
        model=Person 
        fields = '__all__'

class MessageSerializer(ModelSerializer):
    '''
    Serializer for Message
    Parent Class: ModelSerializer
    Contained Classes: Meta 
    '''
    class Meta:
        model = Message
        fields = ('id', 'username', 'content', 'timestamp')
        read_only_fields = ('id', 'timestamp')

class ReviewsSerializer(ModelSerializer):
    '''
    Serializer for Reviews
    Parent Class: ModelSerializer
    Contained Classes: Meta 
    '''
    class Meta:
        model = Reviews
        fields = '__all__'

class NotificationSerialzier(ModelSerializer):
    '''
    Serializer for Notifications
    Parent Class: ModelSerializer
    Contained Classes: Meta 
    '''
    class Meta:
        model = Notifications
        fields = '__all__'
    