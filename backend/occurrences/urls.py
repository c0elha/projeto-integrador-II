from django.urls import path, include
from . import views
from rest_framework import routers

from .viewsets import ActionsViewSet, CategoriesViewSet, CommentsViewSet, OccurrencesViewSet

route = routers.DefaultRouter()

route.register(r'ocurrences', OccurrencesViewSet, basename="Occurrences")
route.register(r'ocurrences-categories', CategoriesViewSet, basename="Categories")
route.register(r'ocurrences-actions', ActionsViewSet, basename="Actions")
route.register(r'ocurrences-comments', CommentsViewSet, basename="Comments")

urlpatterns = [
    path('', include(route.urls))
]