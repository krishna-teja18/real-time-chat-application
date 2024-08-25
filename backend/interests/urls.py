from django.urls import path
from . import views

urlpatterns = [
    path('send/<int:recipient_id>/', views.send_interest, name='send_interest'),
    path('list/', views.list_interests, name='list_interests'),
    path('respond/<int:interest_id>/', views.respond_interest, name='respond_interest'),
    path('accepted/', views.accepted_interests, name='accepted_interests'),
]
