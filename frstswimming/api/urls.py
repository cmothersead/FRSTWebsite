from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SwimmerViewSet

router = DefaultRouter()
router.register(r'swimmers', SwimmerViewSet, basename="")

urlpatterns = [
    path('', include(router.urls)),
    # path('<int:pk>/', DetailView.as_view(), name='detail'),
]