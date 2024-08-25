from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

class Interest(models.Model):
    sender = models.ForeignKey(User, related_name='sent_interests', on_delete=models.CASCADE)
    recipient = models.ForeignKey(User, related_name='received_interests', on_delete=models.CASCADE)
    message = models.TextField(blank=True, null=True)
    is_accepted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    participants = models.ManyToManyField(User, related_name='interests_participating', blank=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.is_accepted:
            self.participants.add(self.sender, self.recipient)

    def __str__(self):
        return f"Interest from {self.sender.email} to {self.recipient.email}"

