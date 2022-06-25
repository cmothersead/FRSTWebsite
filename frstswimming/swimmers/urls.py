from django.urls import path
from swimmers.views import ListSwimmersView

urlpatterns = [
    path('', ListSwimmersView.as_view(), name='index'),
    # path('<int:pk>/', DetailView.as_view(), name='detail'),
]