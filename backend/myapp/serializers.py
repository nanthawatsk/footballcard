from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from .models import FootballCard, Favorite, UserCollection, UserCollectionItem, Request

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ['username']

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(max_length=128, write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'confirm_password')
        extra_kwargs = {'password': {'write_only': True}, 'email': {'validators': []}}

    def validate(self, data):
        if data['password'] != data.pop('confirm_password'):
            raise serializers.ValidationError('Passwords do not match')
        
        email = data['email']
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError('Email already in use')
        
        return data

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
    confirm_password = serializers.CharField(required=True)

    def validate(self, attrs):
        if attrs['new_password'] != attrs['confirm_password']:
            raise serializers.ValidationError("New password and confirm password do not match.")
        return attrs


class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)


class FootballCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = FootballCard
        fields = '__all__'


class FavoriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorite
        user = serializers.HiddenField(default=serializers.CurrentUserDefault())
        fields = ('id', 'card', 'created_date')


class UserCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCollection
        fields = ('id', 'name', 'user')


class UserCollectionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCollectionItem
        fields = ['id', 'user_collection', 'card', 'created_date']
        


class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ['id', 'name', 'team', 'position', 'brand', 'program', 'year', 'nationalteam', 'league', 'image', 'created_date']