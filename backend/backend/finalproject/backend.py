'''
Author: Advey Nandan
Last Modified: June 2, 2023
DJANGO VERSION 4.1.5

Defines authentication for new User Model
'''
from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.contrib.auth.models import AnonymousUser

class NewAuth(ModelBackend):
    '''
    Defines Authentication for new User Model setup - sets password and username for user 

    Methods --> authenticate
    '''
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserM = get_user_model()
        
        if username is None:
            username = kwargs.get(UserM.USERNAME_FIELD)
        try:
            #case insensitive username field
            case_insensitive = '{}__iexact'.format(UserM.USERNAME_FIELD)
            user = UserM._default_manager.get(**{case_insensitive: username})
        
        except UserM.DoesNotExist:
            UserM().set_password(str(password))
        else:
            if user.password == password and self.user_can_authenticate(user):
                print(f"{user} !!!!")
                return user 