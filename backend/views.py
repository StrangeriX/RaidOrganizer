from django.shortcuts import render
from rest_framework import generics
from django.views.generic.detail import DetailView
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework 			import status, permissions
from rest_framework.views import APIView

from .models import *
from .serializers import *

# -------------------- USER -----------------------------


class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer


class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserDetail(generics.ListAPIView, generics.UpdateAPIView, generics.DestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer

    def get(self, request, pk):
        users = User.objects.get(id=pk)
        serializer = UserDetailSerializer(users)
        return Response(serializer.data)


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
    serializer_class = GuildSerializer


class GuildDetail(generics.ListAPIView):
    queryset = Guild.objects.all()
    serializer_class = GuildSerializer

# -------------------USER TO GUILD---------------------------------------

class UserToGuildView(generics.ListCreateAPIView):
    # stanowisko jest zdefiniowane, user jest zdefiniowany
    queryset = UserToGuild.objects.all()
    serializer_class = UserToGuildSerializer

    def post(self, request):
        stanowiskoID = request.data['Stanowisko']
        stanowisko = GuildPosiiton.objects.get(id=stanowiskoID)
        guildID = request.data['Guild']
        userID = request.data["User"]
        if stanowisko.has_many is False:
            user_count = UserToGuild.objects.filter(Guild_id=guildID, Stanowisko_id=stanowiskoID).count()
            if user_count >= 1:
                return Response("nie można", status=status.HTTP_400_BAD_REQUEST)
        userToGuild = UserToGuild(User_id=userID, Guild_id=guildID, Stanowisko_id=stanowiskoID)
        userToGuild.save()
        return Response("elo zjebie", status=status.HTTP_200_OK)

    def put(self, request):
        serializer = UserToGuildSerializer(data=request.data)
        guildRole = GuildRole.objects.get(name = 'member')
        if ():
            return Response("There can be only one person here", status=status.HTTP_406_NOT_ACCEPTABLE)
        else:
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, "przeszło")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserToGuildDetail(generics.ListAPIView, generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = UserToGuild.objects.all()
    serializer_class = UserToGuildSerializer

    def get(self, request, pk):
        connects = UserToGuild.objects.get(id=pk)
        serializer = UserToGuildSerializer(connects)
        return Response(serializer.data)
# ----------------------------------------------------------

class PositionView(generics.ListCreateAPIView):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer


# ----------------------------------------------------------

class RaidListView(generics.ListCreateAPIView):
    queryset = Raid.objects.all()
    serializer_class = RaidSerializer

# ----------------------------------------------------------

class GroupView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer