# ------------------User To Guild------------------------
# views for User To Guild model C+ R+ U+ D+
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


class UserToGuildView(generics.ListCreateAPIView):
    queryset = UserToGuild.objects.all()
    serializer_class = UserToGuildSerializer

    def post(self, request):
        data = request.data
        connect = UserToGuild.objects.filter(user=data["user"], guild=data["guild"])
        if (connect.exists()):
            return Response("already exist")
        guild_position_id = request.data["guild_position"]
        guild_position = GuildPosition.objects.get(id=guild_position_id)
        guild_id = request.data["guild"]
        user_id = request.data["user"]
        if guild_position.has_many is False:
            user_count = UserToGuild.objects.filter(
                guild_id=guild_id, guild_position_id=guild_position_id
            ).count()
            if user_count >= 1:
                return Response(
                    "There can be only 1 person here",
                    status=status.HTTP_400_BAD_REQUEST,
                )
        userToGuild = UserToGuild(
            user_id=user_id, guild_id=guild_id, guild_position_id=guild_position_id
        )
        userToGuild.save()
        return Response("Welcome in guild", status=status.HTTP_200_OK)


class UserToGuildDetail(
    generics.ListCreateAPIView, generics.DestroyAPIView, generics.UpdateAPIView
):
    queryset = UserToGuild.objects.all()
    serializer_class = UsertToGuildCreateSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        guild = Guild.objects.get(guild_name=data["guild"])
        user = User.objects.get(username=data["user"])
        connect = UserToGuild.objects.filter(user=user, guild=guild)
        if (connect.exists()):
            return Response("already exist")
        guild_position_id = request.data["guild_position"]
        guild_position = GuildPosition.objects.get(id=guild_position_id)
        guild_id = Guild.objects.get(guild_name=data["guild"]).id
        user_id = User.objects.get(username=data["user"]).id
        if guild_position.has_many is False:
            user_count = UserToGuild.objects.filter(
                guild_id=guild_id, guild_position_id=guild_position_id
            ).count()
            if user_count >= 1:
                return Response(
                    "There can be only 1 person here",
                    status=status.HTTP_400_BAD_REQUEST,
                )
        userToGuild = UserToGuild(
            user_id=user_id, guild_id=guild_id, guild_position_id=guild_position_id
        )
        userToGuild.save()
        return Response("Welcome in guild", status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        data = request.data
        poster = User.objects.get(username=data)
        promoted = User.objects.get(username=kwargs["username"])
        guild = Guild.objects.get(guild_name=kwargs["guild"])
        guild_position = UserToGuild.objects.get(user=poster, guild=guild)
        position_id = guild_position.guild_position.id
        if position_id > 2:
            return Response("cant promote", status=status.HTTP_401_UNAUTHORIZED)
        promotion = UserToGuild.objects.get(user=promoted, guild=guild)
        if promotion.guild_position.id == 3:
            new_position = GuildPosition.objects.get(id=2)
            new_rang = UserToGuild(id=promotion.id, user=promoted, guild=guild, guild_position=new_position)
            new_rang.save(force_update=True)
            return Response("tak")
        else:
            new_position = GuildPosition.objects.get(id=3)
            new_rang = UserToGuild(id=promotion.id, user=promoted, guild=guild, guild_position=new_position)
            new_rang.save(force_update=True)
            return Response("tak")

    def delete(self, request, *args, **kwargs):
        user = User.objects.get(username=kwargs["username"])
        guild = Guild.objects.get(guild_name=kwargs["guild"])
        userto = UserToGuild.objects.get(guild=guild, user=user)
        userto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserToGuildListView(generics.ListAPIView):
    serializer_class = UserToGuildSerializer
    queryset = UserToGuild.objects.all()

    def get_queryset(self):
        user = self.kwargs['username']
        return super().get_queryset().filter(user__username=user).order_by("guild_position")
