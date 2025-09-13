from django.db import models
from django.utils import timezone

# Create your models here.


class PrimerTabla(models.Model):
    name = models.CharField(max_length=50, null=False)
    age = models.IntegerField(null=False)
    created = models.DateTimeField(default=timezone.now)
    edit = models.DateTimeField(blank=True, null=True, default=None)
