from django.contrib import admin
from .models import Message

@admin.register(Message)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('interest', 'sender', 'timestamp')
    search_fields = ('interest__sender__username', 'interest__recipient__username', 'message')
    list_filter = ('timestamp',)