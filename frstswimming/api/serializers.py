from rest_framework.serializers import ModelSerializer
from .models import Season, Swimmer

class SwimmerSerializer(ModelSerializer):
    class Meta:
        model = Swimmer
        fields = ['first_name', 'pref_name', 'middle_name', 'last_name', 'sex', 'age', 'birthday', 'groups']

class SeasonSerializer(ModelSerializer):
    class Meta:
        model = Season
        fields = ['name', 'course', 'group_set']