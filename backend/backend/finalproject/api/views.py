'''
Author: Advey Nandan
Last Modified: June 2, 2023
DJANGO VERSION 4.1.5

Handle urls and requests with functions
'''

from django.http import JsonResponse
from rest_framework.response import Response 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework import generics
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import  UserSerializer, PersonSerializer, MessageSerializer, ReviewsSerializer, NotificationSerialzier
from finalproject.models import Person, Message, Reviews, Room, Notifications
#https://django-rest-framework-simplejwt.readthedocs.io/en/latest/customizing_token_claims.html

from django.shortcuts import render
from finalproject.models import UserModel
from django.http import HttpResponseRedirect
from django.contrib.auth import login as auth_login
from django.contrib.auth import get_user_model
from django.contrib import messages
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode 
from django.utils.encoding import force_bytes, force_str 
from django.core.mail import EmailMessage
from ICS4U.tokens import account_activation_token
from textblob import TextBlob



#REST API stuffs
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

def activate(request, uidb64, token):
    '''
    Activates user when they click on link in email

    Args:
        request: HttpRequest
        uidb6: hashed value
        token: hashed value
    Returns:
        HttpResponseRedirect
    '''
    us = get_user_model()
    try: 
        uid = force_str(urlsafe_base64_decode(uidb64))
        user = UserModel.objects.get(pk=uid)
        
    except:
        user = None 
    if user is not None and account_activation_token.check_token(user, token):
        user.is_active = True 
        user.save()
        person = Person(user=user, competence="", profileDone=False)
        person.save()
        messages.success(request, "You are registered! You can now login")

    else:
        messages.error(request, "Activation link invalid")

    return HttpResponseRedirect("/")

def activateEmail(request, user, to_email):
    '''
    Activates email when user signs up

    Args:
        request: HttpRequest
        user: Django User object
        to_email: String
    '''
    mail_subject = "Activate user account"
    message = render_to_string("activateaccnt.html", 
        {'user': user.email,
        'domain': get_current_site(request).domain,
        'uid':urlsafe_base64_encode(force_bytes(user.pk)),
        'token': account_activation_token.make_token(user),
        'protocol': 'https' if request.is_secure() else 'http'}
    )
    email = EmailMessage(mail_subject, message, to=[to_email])
    if email.send():
        messages.success(request, f'Hey {user} go to your email inbox and click the link to activate account')
    else:
        print("BRUHHHHSDJKDHJK")
        messages.error(request, {'Problem sending email to {to_email}, check if you typed wrong'})
    

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    '''
    Generates authentication tokens

    Methods:
        get_token: get token with user email
    '''
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    '''
    Used for testing purposes 

    Args:
        request: HttpRequest
    Returns:
        Response
    '''
    routes = [
        '/api/token',
        '/api/token/refresh',

    ]
    for i in Person.objects.all():
        print(i.user.email, " ", i.id)
    return Response(routes)




@api_view(['POST'])
def SignUp(request):
    '''
    Registers user into database and activates email

    Args:
        request: HttpRequest
    Returns:
        Response
    '''
    data = request.data
    u = ""
    if(not UserModel.objects.filter(email=data['email']).exists()):
        u = UserModel(email=data['email'], password=data['password'])
        u.is_active=False 
        u.save()
        activateEmail(request, u, u.email)
        serializer = UserSerializer(u, many=False)
        return Response(serializer.data)
    
    return Response(status=204)

@api_view(['PUT'])
def updateProfile(request, pk):
    '''
    Update profile of user given private key

    Args:
        request: HttpRequest
        pk: Integr
    Returns:
        Response
    '''
    data = request.data
    person = Person.objects.get(id=pk)
    serializer = PersonSerializer(instance=person, data=data)
    print(data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['GET'])
def getProfile(request, pk):
    '''
    Returns the profile of a user given their private key

    Args:
        request: HttpRequest
        pk: Integer
    Returns:
        Response
    '''
    person = Person.objects.get(id=pk)
    serializer = PersonSerializer(person, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getProfiles(request):
    '''
    Returns all profiles in the database through JSON

    Args:
        request: HttpRequest
    Returns:
        Response
    '''
    profiles = Person.objects.all()
    serializer = PersonSerializer(profiles, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def setReviews(request):
    '''
    Analyzes polarity of the given review and decides whether or not to register into database

    Args:
        request: HttpRequest
    Returns:
        Response
    Sentiment Analysis: https://www.youtube.com/watch?v=tXuvh5_Xyrw
    '''
    data = request.data
    ctents = data['content']
    blob = TextBlob(ctents)
    sentiment = blob.sentiment.polarity
    print(sentiment)
    if(sentiment >= 0):
        p = Reviews(content = ctents)
        p.save()
        serializer = ReviewsSerializer(p, many=False)
        return Response(serializer.data)
    return Response(status=204)

@api_view(['GET'])
def getReviews(request):
    '''
    Gets all reviews from database

    Args:
        request: HttpRequest
    Returns:
        Response
    '''
    revs = Reviews.objects.all()
    serializer = ReviewsSerializer(revs, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getMessages(request, room):
    '''
    Gets all messages from a particular room 

    Args:
        request: HttpRequest
        room: hashed string
    Returns:
        Response
    '''
    r = Room.objects.get(name=room)
    m = Message.objects.filter(room=r)
    serializer = MessageSerializer(m, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def editMessages(request):
    '''
    Edits all messages of a specific user when their first name is changed (username)

    Args:
        request: HttpRequest
    Returns:
        Response
    '''
    data = request.data
    messages = Message.objects.filter(username=data['pastusername'])
    if(messages.exists()):
        print("WOAAH", messages)
        messages.update(username=data['username'])
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    return Response(status=204)

@api_view(['POST'])
def getRoom(request):
    '''
    Create or get an existing message room 

    Args:
        request: HttpRequest
    Returns:
        Response
    '''
    data = request.data
    ctents = data['room'] 
    print("getroom", ctents)
    try:
        Room.objects.get(name=ctents)
    except:
        Room.objects.create(name=ctents)
    return Response(status=204)

@api_view(['GET'])
def getNotifs(request, pk):
    '''
    Get notifications regarding a specific user

    Args:
        request: HttpRequest
        pk: Integer
    Returns:
        Response
    '''
    notifications = Notifications.objects.filter(user=Person.objects.get(id=pk))
    if(notifications.exists()):
        people = []
        for n in notifications:
            people.append(Person.objects.get(id=int(n.user2)))
        serializer = PersonSerializer(people, many=True)
        return Response(serializer.data)
    return Response(status=204)

@api_view(['DELETE'])
def deleteNotif(request, pk1, pk2):
    '''
    Delete a notification for user with id pk1 from user with id pk2

    Args:
        request: HttpRequest
        pk1: Integer
        pk2: Integer
    Returns:
        Response
    '''
    person = Person.objects.get(id=pk1)
    try:
        mod = Notifications.objects.get(user=person, user2=str(pk2))
        mod.delete()
        return Response(status=204)
    except Notifications.DoesNotExist:
        return Response(status=204)





    
# class MessageList(generics.ListCreateAPIView):
#     queryset = Message.objects.all()
#     serializer_class = MessageSerializer
#     ordering = ('-timestamp',)


     