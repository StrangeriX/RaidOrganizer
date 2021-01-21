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


class UserToGroupView(
    generics.CreateAPIView, generics.DestroyAPIView, generics.UpdateAPIView
):
    queryset = UserToGroup.objects.all()
    serializer_class = UserToGroupSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        user = User.objects.get(username=kwargs["username"])
        raid = Raid.objects.get(id=kwargs["raid_id"]).id
        position = Position.objects.get(id=data["position_id"]).id

        groups = Group.objects.filter(raid=raid)

        for i in groups:
            connection = UserToGroup.objects.filter(group=i, user=user)
            if connection:
                connection = UserToGroup.objects.get(group=i, user=user).id
                new_group = Group.objects.get(position=position, raid=raid)
                connection = UserToGroup(id=connection, user=user, group=new_group)
                connection.save(force_update=True)
                return Response(status=status.HTTP_200_OK)
        new_group = Group.objects.get(position=position, raid=raid)
        connection = UserToGroup(user=user, group=new_group)
        connection.save(force_insert=True)
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        print(request, kwargs)
        return Response("tak")