from rest_framework import serializers
from .models import Swimmer

class SwimmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Swimmer
        fields = ['first_name', 'pref_name', 'middle_name', 'last_name', 'sex', 'age', 'birthday', 'groups']