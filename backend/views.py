from django.shortcuts import render
from rest_framework import generics, status, permissions
from django.views.generic.detail import DetailView
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import (
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
from .serializers import (
    UserSerializer,
    UserDetailSerializer,
    CharacterSerializer,
    UserToGuildSerializer,
    GuildListSerializer,
    UsertToGuildCreateSerializer,
    GuildCreateSerializer,
    GuildSerializer,
    PositionSerializer,
    GroupSerializer,
    RaidCreateSerializer,
    RaidDetailSerializer,
)

# -------------------- USER -----------------------------


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer

    def post(self, request):
        print(request.data)
        user = User(username=request.data["username"], email=request.data["email"])
        user.set_password(request.data["password"])
        user.save()
        return Response(status=status.HTTP_201_CREATED)


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.ListAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):

        users = User.objects.get(id=pk)
        serializer = UserDetailSerializer(users)
        return Response(serializer.data)

    def put(self, request, pk):
        user = User.objects.get(id=pk)
        print(request.user.is_superuser)
        if request.user.id != user and not request.user.is_superuser:
            return Response(
                "You cant change other users", status=status.HTTP_401_UNAUTHORIZED
            )
        else:
            user = User(
                id=pk, username=request.data["username"], email=request.data["email"]
            )
            user.set_password(request.data["password"])
            user.save()
            return Response(status=status.HTTP_201_CREATED)


# ---------------------- Character -------------------------------


class CharacterCreate(generics.CreateAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer


class CharacterView(generics.ListAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer


# --------------------- Guild -----------------------------


class GuildCreate(generics.CreateAPIView):
    queryset = Guild.objects.all()
    serializer_class = GuildCreateSerializer


class GuildListView(generics.ListAPIView):
    queryset = Guild.objects.all()
    serializer_class = GuildListSerializer


class GuildDetail(generics.ListAPIView):
    queryset = Guild.objects.all()
    serializer_class = GuildSerializer

    def get(self, request, pk):
        guilds = Guild.objects.get(id=pk)
        serializer = GuildSerializer(guilds)
        return Response(serializer.data)


# -------------------USER TO GUILD---------------------------------------


class UserToGuildView(generics.ListCreateAPIView):
    # stanowisko jest zdefiniowane, user jest zdefiniowany
    queryset = UserToGuild.objects.all()
    serializer_class = UserToGuildSerializer

    def post(self, request):
        print(request.data)
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
    generics.ListAPIView, generics.DestroyAPIView, generics.UpdateAPIView
):
    queryset = UserToGuild.objects.all()
    serializer_class = UserToGuildSerializer

    def get(self, request, pk):
        connects = UserToGuild.objects.get(id=pk)
        serializer = UserToGuildSerializer(connects)
        return Response(serializer.data)

    # do zrobienia put


# ----------------------------------------------------------


class PositionView(generics.ListCreateAPIView):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer


# ----------------------------------------------------------


class RaidCreateView(generics.CreateAPIView):
    queryset = Raid.objects.all()
    serializer_class = RaidCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        this_user = UserToGuild.objects.get(user_id=user.id)
        this_user_position = this_user.guild_position.id  # id roli w gildii usera
        guild = this_user.guild  # id gildii usera
        if this_user_position == 1 or this_user_position == 2:
            serializer = request.data
            raid = Raid(name=serializer["name"], guild_id=guild.id)
            raid.save()
            dd = serializer.get("damage_slots")
            damage_slots = Group(slot=dd, raid=raid, position="DD")
            damage_slots.save()
            tank = serializer.get("tank_slots")
            tank_slots = Group(slot=tank, raid=raid, position="Tank")
            tank_slots.save()
            healer = serializer.get("healer_slots")
            healer_slots = Group(slot=healer, raid=raid, position="Healer")
            healer_slots.save()
        else:
            return Response("Nie masz uprawnień", status=status.HTTP_401_UNAUTHORIZED)
        return Response(status=status.HTTP_201_CREATED)


class RaidDetailView(generics.ListAPIView):
    queryset = Raid.objects.all()
    serializer_class = RaidDetailSerializer

    def get(self, request, pk):
        raids = Raid.objects.get(id=pk)
        serializer = RaidDetailSerializer(raids)
        return Response(serializer.data)
    def update(self, request):
        return Response("tak")

class RaidUsersView(generics.UpdateAPIView):
    serializer_class = RaidDetailSerializer
    def get(self, request, pk):
        raids = Raid.objects.get(id=pk)
        serializer = RaidDetailSerializer(raids)
        return Response(serializer.data)
# ----------------------------------------------------------


class GroupView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
