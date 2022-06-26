from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SeasonViewSet, SwimmerViewSet

router = DefaultRouter()
router.register(r'swimmers', SwimmerViewSet, basename="swimmers")
router.register(r'seasons', SeasonViewSet, basename="seasons")

urlpatterns = [
    path('', include(router.urls)),
]