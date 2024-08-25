from rest_framework import serializers
from users.serializers import UserSerializer
from .models import Interest

class InterestSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    recipient = UserSerializer(read_only=True)

    class Meta:
        model = Interest
        fields = ('id', 'sender', 'recipient', 'message', 'is_accepted', 'created_at')