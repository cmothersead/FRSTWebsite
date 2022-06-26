from rest_framework.viewsets import ModelViewSet
from .serializers import SwimmerSerializer
from .models import Swimmer

# class IndexView(generic.ListView):
#     model = Swimmer

#     def get_queryset(self):
#         query_set = Swimmer.objects.all().prefetch_related('groups')
#         return query_set

# class DetailView(generic.DetailView):
#     model = Swimmer

class SwimmerViewSet(ModelViewSet):
    queryset = Swimmer.objects.all().prefetch_related('groups')
    serializer_class = SwimmerSerializer
