from django.urls import path, include
from knox import views as knox_views
from .views import RegisterAPI, LoginAPI, UserCreateAPIView
from .views import ChangePasswordView, PasswordResetView, FootballCardList, FootballCardDetail, FavoriteCreateAPIView, CollectionCreateAPIView, UserCollectionItemAPIView, UserCollectionItemDeleteAPIView, favoriteDeleteAPIView, RequestCreateAPIView

urlpatterns = [
    path('api/register/', RegisterAPI.as_view(), name='register'),
    path('api/login/', LoginAPI.as_view(), name='login'),
    path('api/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/user/', UserCreateAPIView.as_view(), name='user'),
    path('api/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('api/password-reset/', PasswordResetView.as_view(), name='password_reset'),
    path('api/footballcard/', FootballCardList.as_view(), name='footballcard'),
    path('api/footballcard/<int:pk>/', FootballCardDetail.as_view(), name='footballcard-detail'),
    path('api/favorites/create/', FavoriteCreateAPIView.as_view(), name='create_favorite'),
    path('api/favorites/<int:pk>/delete/', favoriteDeleteAPIView.as_view(), name='delete_favorite'),
    path('api/collections/', CollectionCreateAPIView.as_view(), name='collection-create'),
    path('api/usercollectionitem/create/', UserCollectionItemAPIView.as_view(), name='usercollectionitem'),
    path('api/usercollectionitem/<int:pk>/delete/', UserCollectionItemDeleteAPIView.as_view(), name='usercollectionitem-delete'),
    path('api/request/', RequestCreateAPIView.as_view(), name='request-create' )
]