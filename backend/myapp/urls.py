from django.urls import path, include
from knox import views as knox_views
from .views import RegisterAPI, LoginAPI, UserCreateAPIView, UserProfileAPIView, UserProfileUpdateAPIView, FavoriteListAPIView, CollectionListAPIView, UserCollectionItemListAPIView, UserCollectionItemDeleteAPIView, CollectionDeleteAPIView
from .views import ChangePasswordView, PasswordResetView, FootballCardList, FootballCardDetail, FavoriteCreateAPIView, CollectionCreateAPIView, UserCollectionItemAPIView, UserCollectionItemDeleteAPIView, favoriteDeleteAPIView, RequestCreateAPIView
from .views import FootballcardSearchAPIView, FootballcardNewReleaseAPIView
urlpatterns = [
    path('api/auth/register/', RegisterAPI.as_view(), name='register'),
    path('api/auth/login/', LoginAPI.as_view(), name='login'),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='logout'),
    path('api/auth/logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
    path('api/auth/', include('knox.urls')),
    path('api/user/', UserCreateAPIView.as_view(), name='user'),
    path('api/user/profile/', UserProfileAPIView.as_view(), name='user-profile'),
    path('api/user/profile/update/', UserProfileUpdateAPIView.as_view(), name='user-profile-update'),
    path('api/change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('api/password-reset/', PasswordResetView.as_view(), name='password_reset'),
    path('api/footballcard/', FootballCardList.as_view(), name='footballcard'),
    path('api/footballcard/<int:pk>/', FootballCardDetail.as_view(), name='footballcard-detail'),
    path('api/footballcard/search/', FootballcardSearchAPIView.as_view(), name='footballcard-search'),
    path('api/footballcard/newrelease/', FootballcardNewReleaseAPIView.as_view(), name='footballcard-newrelease'),
    path('api/favorites/', FavoriteListAPIView.as_view(), name='favorites'),
    path('api/favorites/create/', FavoriteCreateAPIView.as_view(), name='create_favorite'),
    path('api/favorites/<int:pk>/delete/', favoriteDeleteAPIView.as_view(), name='delete_favorite'),
    path('api/collections/', CollectionCreateAPIView.as_view(), name='collection-create'),
    path('api/collections/<int:pk>/delete/', CollectionDeleteAPIView.as_view(), name='collection-delete'),
    path('api/collections/list/', CollectionListAPIView.as_view(), name='collection-list'),
    path('api/usercollectionitem/create/', UserCollectionItemAPIView.as_view(), name='usercollectionitem'),
    path('api/usercollectionitem/<int:pk>/delete/', UserCollectionItemDeleteAPIView.as_view(), name='usercollectionitem-delete'),
    path('api/usercollectionitem/<int:pk>/', UserCollectionItemListAPIView.as_view(), name='usercollectionitem-list'),
    path('api/request/', RequestCreateAPIView.as_view(), name='request-create' )
]