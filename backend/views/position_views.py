from rest_framework import generics, status, permissions
from rest_framework.response import Response
from backend.models import (
    Position,
    Character,
    Guild,
    GuildPosition,
    UserToGuild,
    Group,
    Raid,
    UserToGroup,
    User,
)
from backend.serializers import (
    UserCharacterSerializer,
    UserToGuildSerializer,
    GuildListSerializer,
    UsertToGuildCreateSerializer,
    GuildCreateSerializer,
    GuildSerializer,
    PositionSerializer,
    UserToGroupSerializer,
    RaidCreateSerializer,
    RaidDetailSerializer,
    UserCharacterSerializer,
    CharacterSerializer,
)


class PositionView(generics.ListCreateAPIView):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer
