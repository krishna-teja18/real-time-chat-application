from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/interests/', include('interests.urls')),
    path('api/chat/', include('chat.urls')),
]
