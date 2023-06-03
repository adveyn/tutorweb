#Navbar: https://www.youtube.com/watch?v=qNifU_aQRio
#Django Setup: https://www.youtube.com/watch?v=LQTMqGns7Co
#HTML classes: https://www.w3schools.com/html/html_classes.asp
#https://docs.djangoproject.com/en/4.1/topics/class-based-views/
#https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
#https://stackoverflow.com/questions/25187903/what-do-curly-braces-around-javascript-variable-name-mean


from django.contrib import admin
from django.urls import path, include
from finalproject.views import index
urlpatterns = [
    path('', index),
    #REST
    path('api/', include('finalproject.api.urls')),
]
 