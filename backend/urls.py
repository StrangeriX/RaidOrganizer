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
)

urlpatterns = [
    path("char/list", CharacterView.as_view()),
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
