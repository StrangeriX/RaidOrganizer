from django.urls import path, include
from .views import (
    CharacterRetriveView,
    GuildCreate,
    GuildListView,
    GuildDetail,
    UserToGuildView,
    UserToGuildDetail,
    PositionView,
    RaidCreateView,
    RaidDetailView,
    GroupView,
    UserCharacterView,
    CharactersView,
    UserToGuildListView,
    RaidListView,
)

urlpatterns = [
    path("char/<str:username>", UserCharacterView.as_view()),
    path("char/delete/<int:pk>", CharacterRetriveView.as_view()),
    path("char/create", CharactersView.as_view()),
    path("guild/create", GuildCreate.as_view()),
    path("guild/list", GuildListView.as_view()),
    path("guild/<int:pk>", GuildDetail.as_view()),
    path("userto/list", UserToGuildView.as_view()),
    path("userto/<str:username>", UserToGuildListView.as_view()),

    path("position", PositionView.as_view()),
    path("raid/list/<int:guildid>", RaidListView.as_view()),
    path("raid/create", RaidCreateView.as_view()),
    path("raid/<int:pk>", RaidDetailView.as_view()),
    path("group", GroupView.as_view()),
]
