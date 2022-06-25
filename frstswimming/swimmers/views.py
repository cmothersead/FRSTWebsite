from django.shortcuts import render
from django.views import generic
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from .serializers import SwimmerSerializer
from .models import Swimmer

# class IndexView(generic.ListView):
#     model = Swimmer

#     def get_queryset(self):
#         query_set = Swimmer.objects.all().prefetch_related('groups')
#         return query_set

# class DetailView(generic.DetailView):
#     model = Swimmer

class ListSwimmersView(ListAPIView):
    queryset = Swimmer.objects.all().prefetch_related('groups')
    serializer_class = SwimmerSerializer
