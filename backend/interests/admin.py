from django.contrib import admin
from .models import Interest

@admin.register(Interest)
class InterestAdmin(admin.ModelAdmin):
    list_display = ('sender', 'recipient', 'message')
    search_fields = ('sender__username', 'recipient__username', 'message')