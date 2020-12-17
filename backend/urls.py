from django.urls import path
from .views import *

urlpatterns = [
    path("user/list", UserView.as_view()),
    path("user/create", UserCreate.as_view()),
    path("user/<int:pk>", UserDetail.as_view()),
    path("char/create", CharacterCreate.as_view()),
    path("char/list", CharacterView.as_view()),
    path("guild/create", GuildCreate.as_view()),
    path("guild/list", GuildListView.as_view()),
    path("guild/<int:pk>", GuildDetail.as_view()),
    path("userto/list", UserToGuildView.as_view()),
    path("userto/<int:pk>", UserToGuildDetail.as_view()),
    path("position", PositionView.as_view()),
    path("raid", RaidListView.as_view()),
    path("raid/<int:pk>", RaidDetailView.as_view()),
    path("group", GroupView.as_view()),
]
