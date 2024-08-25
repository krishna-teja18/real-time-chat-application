# Generated by Django 5.1 on 2024-08-23 05:57

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interests', '0004_alter_interest_message'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='interest',
            name='participants',
            field=models.ManyToManyField(blank=True, related_name='interests', to=settings.AUTH_USER_MODEL),
        ),
    ]
