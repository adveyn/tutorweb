'''
Author: Advey Nandan
Last Modified: June 2, 2023
DJANGO VERSION 4.1.5

All urls used in the program
'''

from django.urls import path 
from . import views 
from .views import MyTokenObtainPairView, SignUp
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [

    path('home/', views.getRoutes),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('activate/<uidb64>/<token>', views.activate, name='activate'),
    path('signup/', views.SignUp, name='signup'),
    path('profile/<str:pk>/update/', views.updateProfile, name='updateProfile'),
    path('profile/<str:pk>/', views.getProfile, name='getProfile'),
    path('profiles/', views.getProfiles, name='getProfiles'),
    # path('messages/', views.MessageList.as_view()),
    path('reviews/', views.setReviews, name='reviews'),
    path('reviewsGetter/', views.getReviews, name='getreviews'),
    path('messages/<str:room>/', views.getMessages, name='getMessages'),
    path('editMessages/', views.editMessages, name='editMessages'),
    path('getroom/', views.getRoom, name='getRoom'),
    path('getNotifs/<str:pk>/', views.getNotifs, name='getNotifs'),
    path('delete/<str:pk1>/<str:pk2>/', views.deleteNotif, name="deleteNotif")
    
    
    
]