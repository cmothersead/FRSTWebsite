from datetime import date
from django.db import models
from django.utils import timezone

class Swimmer(models.Model):
    first_name = models.CharField(max_length=45)
    preferred_name = models.CharField(max_length=45, null=True)
    middle_name = models.CharField(max_length=45)
    last_name = models.CharField(max_length=45)
    gender = models.CharField(max_length=1)
    birthday = models.DateField()

    def __str__(self) -> str:
        return self.first_name + ' ' + self.last_name

    def age_on(self, date):
        return date.year - self.birthday.year - ((date.month, date.day) < (self.birthday.month, self.birthday.day))
    
    @property
    def age(self):
        return self.age_on(date.today())
