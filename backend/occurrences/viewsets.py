from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import authentication, permissions
from django.contrib.auth.models import User

from .serializers import CategoriesSerializer, OccurrencesSerializer
from .models import Categories, Occurrences

# @permission_classes([IsAuthenticated])
class CategoriesViewSet(viewsets.ModelViewSet):
    serializer_class = CategoriesSerializer
    queryset = Categories.objects.all()

# @permission_classes([IsAuthenticated])
class OccurrencesViewSet(viewsets.ModelViewSet):
    serializer_class = OccurrencesSerializer
    queryset = Occurrences.objects.all()



