from rest_framework.viewsets import ModelViewSet
from .serializers import SeasonSerializer, SwimmerSerializer
from .models import Season, Swimmer


class SwimmerViewSet(ModelViewSet):
    queryset = Swimmer.objects.all().prefetch_related('groups')
    serializer_class = SwimmerSerializer

class SeasonViewSet(ModelViewSet):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer