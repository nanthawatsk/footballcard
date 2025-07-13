from django.contrib import admin
from .models import FootballCard, Favorite, UserCollection, UserCollectionItem, Request

# Register your models here.
admin.site.register(FootballCard)
admin.site.register(Favorite)
admin.site.register(UserCollection)
admin.site.register(UserCollectionItem)
admin.site.register(Request)