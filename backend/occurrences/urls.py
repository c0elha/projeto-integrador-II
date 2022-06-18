from django.urls import path, include

from rest_framework import routers

from .viewsets import CategoriesViewSet, OccurrencesViewSet
from .views import getOcurrencesByUser, getOcurrencesAllByStatus, getUserByOcurrences

route = routers.DefaultRouter()

route.register(r'occurrences', OccurrencesViewSet, basename="Occurrences")
route.register(r'occurrences-categories', CategoriesViewSet, basename="Categories")

urlpatterns = [
    path('', include(route.urls)),
    path('occurrences-list/', getOcurrencesByUser),
    path('occurrences-all-list/<str:type_status>/', getOcurrencesAllByStatus),
    path('occurrences-user/<str:occurrence_id>/', getUserByOcurrences),
]


