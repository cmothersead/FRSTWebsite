from django.shortcuts import render
from django.views import generic

from frstswimming.swimmers.models import Swimmer

class IndexView(generic.ListView):
    model = Swimmer
