from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Task(models.Model):
    PRIORITY_CHOICES = [("High","High"),("Medium","Medium"),("Low","Low")]

    owner = models.ForeignKey(User, related_name='tasks', on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    # Features used for prioritization
    deadline = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    importance = models.IntegerField(default=3) # 1..5
    urgency_flag = models.BooleanField(default=False)
    estimated_hours = models.FloatField(default=1.0)
    dependencies = models.IntegerField(default=0)
    value_score = models.IntegerField(default=5) # 1..10
    recurrence = models.CharField(max_length=20, default='none')
    owner_load = models.FloatField(default=0.0)
    context_match = models.BooleanField(default=False)
    blocked = models.BooleanField(default=False)
    category = models.CharField(max_length=50, default='feature')


    # output predicted values
    priority_label = models.CharField(max_length=10, choices=PRIORITY_CHOICES, null=True, blank=True)
    priority_confidence = models.FloatField(null=True, blank=True)
    priority_reason = models.TextField(blank=True)


    def __str__(self):
        return f"{self.title} ({self.owner})"