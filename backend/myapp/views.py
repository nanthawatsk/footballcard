from myapp.serializers import UserSerializer
from rest_framework import generics, permissions, status, views
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import RegisterSerializer, UserSerializer, PasswordResetSerializer, FootballCardSerializer, ChangePasswordSerializer, FavoriteSerializer, UserCollectionSerializer, UserCollectionItemSerializer
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView
from rest_framework import serializers, viewsets
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated   
from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from pymongo import MongoClient
from .models import FootballCard, UserCollection, UserCollectionItem, Favorite
# Create your views here.

# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })
    

class LoginAPI(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        return super(LoginAPI, self).post(request, format=None)


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            # set_password also hashes the password that the user will get
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetView(views.APIView):
    serializer_class = PasswordResetSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = get_user_model().objects.filter(email=email).first()

            if user:
                token_generator = default_token_generator
                uid = urlsafe_base64_encode(force_bytes(user.pk))
                token = token_generator.make_token(user)

                client = MongoClient('mongodb+srv://admin:Jamekung_008510@cluster0.j4ntpuw.mongodb.net/test')
                db = client['footballcard']
                password_reset_collection = db['password_reset']
                password_reset_collection.insert_one({
                    'user_id': str(user.id),
                    'token': token
                })

                return Response({'message': 'Password reset email sent'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'Invalid email address'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class FootballCardList(generics.ListCreateAPIView):
    queryset = FootballCard.objects.all()
    serializer_class = FootballCardSerializer


class FootballCardDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = FootballCard.objects.all()
    serializer_class = FootballCardSerializer


class FavoriteCreateAPIView(generics.CreateAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer


class favoriteDeleteAPIView(generics.DestroyAPIView):
    queryset = Favorite.objects.all()
    serializer_class = FavoriteSerializer
    

class CollectionCreateAPIView(generics.CreateAPIView):
    queryset = UserCollection.objects.all()
    serializer_class = UserCollectionSerializer

    def create(self, request, *args, **kwargs):
        # Get the user from the request
        user = request.user

        # Create the collection with the user as the owner
        collection_data = {
            'name': request.data.get('name'),
            'user': user.id
        }
        collection_serializer = self.get_serializer(data=collection_data)
        collection_serializer.is_valid(raise_exception=True)
        collection = collection_serializer.save()

        # Add the cards to the collection
        card_ids = request.data.get('cards', [])
        for card_id in card_ids:
            try:
                card = FootballCard.objects.get(id=card_id)
                collection.cards.add(card)
            except FootballCard.DoesNotExist:
                pass

        # Return the serialized representation of the collection
        response_serializer = self.get_serializer(collection)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)


class UserCollectionItemAPIView(generics.CreateAPIView):
    queryset = UserCollectionItem.objects.all()
    serializer_class = UserCollectionItemSerializer

class UserCollectionItemDeleteAPIView(generics.DestroyAPIView):
    queryset = UserCollectionItem.objects.all()
    serializer_class = UserCollectionItemSerializer
