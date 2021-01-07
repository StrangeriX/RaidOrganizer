from django.urls import path, include
from .views import (
    CharacterView,
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
    CreateCharacter,
)

urlpatterns = [
    path("char/<str:username>", UserCharacterView.as_view()),
    path("char/delete/<int:pk>", CharacterView.as_view()),
    path("char/create", CreateCharacter.as_view()),
    path("guild/create", GuildCreate.as_view()),
    path("guild/list", GuildListView.as_view()),
    path("guild/<int:pk>", GuildDetail.as_view()),
    path("userto/list", UserToGuildView.as_view()),
    path("userto/<int:pk>", UserToGuildDetail.as_view()),
    path("position", PositionView.as_view()),
    path("raid", RaidCreateView.as_view()),
    path("raid/<int:pk>", RaidDetailView.as_view()),
    path("group", GroupView.as_view()),
]
