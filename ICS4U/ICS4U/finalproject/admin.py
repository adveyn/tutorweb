'''
Author: Advey Nandan
Last Modified: June 2, 2023
DJANGO VERSION 4.1.5

Configuration for admin site
'''
from django.contrib import admin 
from finalproject.models import UserModel

class Adm(admin.ModelAdmin):
    pass 
admin.site.register(UserModel, Adm)


# Register your models here.
