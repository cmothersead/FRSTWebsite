from rest_framework.viewsets import ModelViewSet
from .serializers import SeasonSerializer, SwimmerSerializer
from .models import Season, Swimmer


class SwimmerViewSet(ModelViewSet):
    queryset = Swimmer.objects.all().prefetch_related('groups')
    serializer_class = SwimmerSerializer

    def update(self, request, *args, **kwargs):
        print(request.data)
        return super().update(request, *args, **kwargs)


class SeasonViewSet(ModelViewSet):
    queryset = Season.objects.all()
    serializer_class = SeasonSerializer