from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework import authentication, permissions
from django.contrib.auth.models import User

from .serializers import ActionsSerializer, CategoriesSerializer, CommentsSerializer, OccurrencesSerializer
from .models import Actions, Categories, Comments, Occurrences

# @permission_classes([IsAuthenticated])
class CategoriesViewSet(viewsets.ModelViewSet):
    serializer_class = CategoriesSerializer
    queryset = Categories.objects.all()

# @permission_classes([IsAuthenticated])
class OccurrencesViewSet(viewsets.ModelViewSet):
    serializer_class = OccurrencesSerializer
    queryset = Occurrences.objects.all()

# @permission_classes([IsAuthenticated])
class ActionsViewSet(viewsets.ModelViewSet):
    serializer_class = ActionsSerializer
    queryset = Actions.objects.all()

# @permission_classes([IsAuthenticated])
class CommentsViewSet(viewsets.ModelViewSet):
    serializer_class = CommentsSerializer
    queryset = Comments.objects.all()    
        



