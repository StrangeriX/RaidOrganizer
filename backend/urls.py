from django.urls import path, include
from .views.character_views import (
    CharactersView,
    CharacterRetriveView,
    UserCharacterView,
)
from .views.guild_views import GuildCreate, GuildListView, GuildDetail
from .views.user_to_guild_views import (
    UserToGuildView,
    UserToGuildDetail,
    UserToGuildListView,
)
from .views.position_views import PositionView
from .views.raid_views import (
    RaidCreateView,
    RaidDetailView,
    RaidListView,
)
from .views.group_views import GroupView


urlpatterns = [
    path("char/username/<str:username>", UserCharacterView.as_view()),
    path("char/mutate/<int:pk>", CharacterRetriveView.as_view()),
    path("char/create", CharactersView.as_view()),
    path("guild/create", GuildCreate.as_view()),
    path("guild/list/<str:username>", GuildListView.as_view()),
    path("guild/<int:pk>", GuildDetail.as_view()),
    path("userto/create", UserToGuildView.as_view()),
    path("userto/mutate/<str:guild>/<str:username>", UserToGuildDetail.as_view()),
    path("userto/username/<str:username>", UserToGuildListView.as_view()),
    path("position", PositionView.as_view()),
    path("raid/list/<int:guildid>", RaidListView.as_view()),
    path("raid/create", RaidCreateView.as_view()),
    path("raid/<int:pk>", RaidDetailView.as_view()),
    path("group", GroupView.as_view()),
]
