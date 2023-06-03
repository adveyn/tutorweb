'''
Author: Advey Nandan
Last Modified: June 2, 2023
DJANGO VERSION 4.1.5

ASGI settings for websocket
Referred to: https://channels.readthedocs.io/en/stable/
'''

from django.db import models
from django.contrib.auth.models import User, AbstractBaseUser, BaseUserManager
from ICS4U.settings import AUTH_USER_MODEL

#overrride user and superuser creation, https://www.youtube.com/watch?v=SFarxlTzVX4
class Manager(BaseUserManager):
    '''
    Manager for new User model
    '''
    def create_user(self, email, password):
        '''
        Creates user given email and password (instead of username)

        Args:
            email: String
            password: String 
        '''
        if not email:
            raise ValueError("User must have email")
        if not password:
            raise ValueError("User must have password")
        user =self.model(
            email = self.normalize_email(email),
        )
        user.set_password(str(password))
        user.save(using=self.db)
        return user 

    def create_superuser(self, email, password):
        '''
        Defines super user creation with email and password

        Args:
            email: String
            password: String 
        '''
        user =self.model(
            email = self.normalize_email(email),
        )
        user.set_password(str(password))

        user.is_admin = True 
        user.is_staff = True 
        user.is_superuser = True 
        user.save(using=self.db)
        return user 

class UserModel(AbstractBaseUser):    
    '''
    User Model inheriting from AbstractBaseUser, defines new functionality
    '''
    email = models.EmailField(verbose_name="email", max_length = 1000, unique=True)
    password = models.CharField(max_length=1000)
    
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = Manager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password']
    def __str__(self):
        return self.email 

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True 



class Person(models.Model):
    '''
    Person model used to store person attributes such as level, subjects etc. which user can modify
    '''
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)       
    role = models.CharField(max_length=250, default="")
    level = models.TextField()
    subjects = models.TextField()
    competence = models.TextField(default="")
    firstname = models.CharField(max_length=250, default="")
    lastname = models.CharField(max_length=250, default="")
    profileDone = models.BooleanField()
    def __str__(self):
        return self.competence[0:50]

class Room(models.Model):
    '''
    Chat room is defined by the room name
    '''
    name = models.CharField(max_length=255, unique=True)

class Message(models.Model):
    '''
    Message class storing username, content, timestamp, and room
    '''
    username = models.CharField(max_length=255)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)
    room = models.ForeignKey('Room',null=False,blank=False,on_delete=models.CASCADE)

    class Meta:
        db_table= "chat_message"
        ordering = ("timestamp", )

class Reviews(models.Model):
    '''
    Review only storing content
    '''
    content = models.TextField(default="") 

class Notifications(models.Model):
    '''
    Defines notification through chat between 2 users
    '''
    user =  models.ForeignKey(Person, on_delete=models.CASCADE, null=True) 
    user2 = models.CharField(max_length=1000) 
   
    
    