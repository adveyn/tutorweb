'''
Author: Advey Nandan
Last Modified: June 2, 2023
DJANGO VERSION 4.1.5

Urls
'''

from django.contrib import admin
from django.urls import path, include
from finalproject.views import index
urlpatterns = [
    path('', index),
    #REST
    path('api/', include('finalproject.api.urls')),
]
 
