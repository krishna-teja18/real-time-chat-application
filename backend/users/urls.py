from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('me/', views.profile, name='profile'),
    path('users/', views.list_users, name='list_users'),
]
