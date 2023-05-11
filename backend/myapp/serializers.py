from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from .models import FootballCard

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name',  'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(username=validated_data['username'],
                                        email=validated_data['email'], 
                                        password=validated_data['password'], 
                                        first_name=validated_data['first_name'], 
                                        last_name=validated_data['last_name'])

        return user

from rest_framework import serializers
from django.contrib.auth.models import User

class ChangePasswordSerializer(serializers.Serializer):
    model = User

    """
    Serializer for password change endpoint.
    """
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)


class FootballCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootballCard
        fields = '__all__'

        
