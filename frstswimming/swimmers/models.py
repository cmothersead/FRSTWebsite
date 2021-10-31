from django.db import models

class Swimmer(models.Model):
    first_name = models.CharField(max_length=45)
    preferred_name = models.CharField(max_length=45, blank=True)
    middle_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    gender = models.CharField(max_length=1)
    birthday = models.DateField()

    def __str__(self) -> str:
        return self.preferred_name + ' ' + self.last_name
