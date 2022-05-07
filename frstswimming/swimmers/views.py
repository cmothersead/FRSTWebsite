from django.shortcuts import render
from django.views import generic

from swimmers.models import Swimmer

class IndexView(generic.ListView):
    model = Swimmer

class DetailView(generic.DetailView):
    model = Swimmer
