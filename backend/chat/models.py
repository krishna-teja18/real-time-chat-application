from django.contrib.auth import get_user_model
from django.db import models
from interests.models import Interest

User = get_user_model()

class Message(models.Model):
    interest = models.ForeignKey(Interest, related_name='messages', on_delete=models.CASCADE)
    sender = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.sender.username} in {self.interest}"
