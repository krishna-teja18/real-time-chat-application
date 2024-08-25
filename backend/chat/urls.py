from django.urls import path
from . import views

urlpatterns = [
    path('<int:interest_id>/', views.chat_view, name='chat_view'),
]
