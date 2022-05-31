from rest_framework import serializers
from .models import Occurrences, Categories, Actions, Comments

class CategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categories
        fields = '__all__'

class OccurrencesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Occurrences
        fields = '__all__'

class ActionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actions
        fields = '__all__'

class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = '__all__'                