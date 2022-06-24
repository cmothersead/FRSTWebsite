from datetime import date
from django.db import models


class Season(models.Model):
    COURSES = (
        ('Y', 'SCY'),
        ('S', 'SCM'),
        ('L', 'LCM')
    )
    name = models.CharField(max_length=45, blank=True, null=True)
    course = models.CharField(max_length=1, choices=COURSES)
    start_date = models.DateField(blank=True, null=True)
    end_date = models.DateField(blank=True, null=True)

    def __str__(self) -> str:
        return self.name


class Group(models.Model):
    name = models.CharField(max_length=45)
    season = models.ForeignKey(Season, models.RESTRICT)
    abbreviation = models.CharField(max_length=10, null=True)

    def __str__(self) -> str:
        return self.name


class Swimmer(models.Model):
    first_name = models.CharField(max_length=45)
    pref_name = models.CharField(max_length=45, blank=True, null=True)
    middle_name = models.CharField(max_length=45, blank=True, null=True)
    last_name = models.CharField(max_length=45)
    sex = models.CharField(max_length=1)
    birthday = models.DateField()
    groups = models.ManyToManyField(Group, through='GroupAssignment')

    def __str__(self) -> str:
        return self.first_name + ' ' + self.last_name

    def age_on(self, date):
        return date.year - self.birthday.year - ((date.month, date.day) < (self.birthday.month, self.birthday.day))

    @property
    def age(self):
        return self.age_on(date.today())


class GroupAssignment(models.Model):
    group = models.ForeignKey(Group, models.RESTRICT)
    swimmer = models.ForeignKey(Swimmer, models.CASCADE)


class Event(models.Model):
    distance = models.IntegerField()
    stroke = models.CharField(max_length=2)
    course = models.CharField(max_length=3)

    def __str__(self) -> str:
        return self.distance+self.stroke


class Meet(models.Model):
    host = models.CharField(max_length=5)
    name = models.CharField(max_length=45)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)

    def __str__(self) -> str:
        return self.start_date.year+" "+self.host+" "+self.name


class OfficialSwim(models.Model):
    official_swim_id = models.AutoField(primary_key=True)
    meet = models.ForeignKey(Meet, models.CASCADE)
    swimmer = models.ForeignKey(Swimmer, models.CASCADE)
    event = models.ForeignKey(Event, models.CASCADE)
    time = models.TimeField(blank=True, null=True)