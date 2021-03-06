from django.shortcuts import render

from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from users.models import User
from users.serializers import UserSerializer

from .models import Occurrences
from .serializers import OccurrencesSerializer

@api_view(['GET'])
def getOcurrencesAllByStatus(request, type_status):
    ocurrences = Occurrences.objects.filter(status=type_status)
    serializer = OccurrencesSerializer(ocurrences, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOcurrencesByUser(request):
    ocurrences = Occurrences.objects.filter(user=request.user)
    serializer = OccurrencesSerializer(ocurrences, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getUserByOcurrences(request, occurrence_id): 
    ocurrences = Occurrences.objects.filter(id=occurrence_id).first()
    user = User.objects.filter(username=ocurrences.user).first()
    serializer = UserSerializer(user)
    return Response(serializer.data)
