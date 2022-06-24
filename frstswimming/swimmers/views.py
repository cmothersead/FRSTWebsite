from django.shortcuts import render
from django.views import generic

from swimmers.models import Swimmer

class IndexView(generic.ListView):
    model = Swimmer

    def get_queryset(self):
        query_set = Swimmer.objects.all().prefetch_related('groups')
        return query_set

class DetailView(generic.DetailView):
    model = Swimmer
