from rest_framework.serializers import ModelSerializer
from users.models import User


class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
