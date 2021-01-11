from rest_framework import generics, status, permissions
from rest_framework.response import Response


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
    UserCharacterSerializer,
    UserToGuildSerializer,
    GuildListSerializer,
    UsertToGuildCreateSerializer,
    GuildCreateSerializer,
    GuildSerializer,
    PositionSerializer,
    GroupSerializer,
    RaidCreateSerializer,
    RaidDetailSerializer,
    UserCharacterSerializer,
    CharacterSerializer,
)


# ---------------------- Character -------------------------------

class CharactersView(generics.ListCreateAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer

# destroying and updating characters
class CharacterRetriveView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer



# geting list of characters by username
class UserCharacterView(generics.ListAPIView):
    serializer_class = UserCharacterSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        return Character.objects.filter(user__username=username)


# --------------------- Guild -----------------------------

class GuildCreate(generics.CreateAPIView):
    queryset = Guild.objects.all()
    serializer_class = GuildCreateSerializer

    def post(self, request):
        data = request.data
        print(data["user_name"])
        user = User.objects.get(username=data["user_name"])
        print(user)
        guild = Guild(guild_name=data["guild_name"])
        guild.save()
        userto = UserToGuild(user=user, guild=guild, guild_position_id=1)
        userto.save()
        return Response(status=status.HTTP_201_CREATED)



class GuildListView(generics.ListAPIView):
    queryset = Guild.objects.all()
    serializer_class = GuildSerializer


class GuildDetail(generics.ListAPIView):
    queryset = Guild.objects.all()
    serializer_class = GuildSerializer

    def get(self, request, pk):
        guilds = Guild.objects.get(id=pk)
        serializer = GuildSerializer(guilds)
        return Response(serializer.data)

    def delete(self, request, pk):
        guild = Guild.objects.get(id=pk)
        links = UserToGuild.objects.filter(guild=guild)
        for i in links:
            i.delete()
        guild.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)


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
    serializer_class = UsertToGuildCreateSerializer

    def get(self, request, pk):
        connects = UserToGuild.objects.get(id=pk)
        serializer = UserToGuildSerializer(connects)
        return Response(serializer.data)

    # do zrobienia post i put


class UserToGuildListView(generics.ListAPIView):
    serializer_class = UserToGuildSerializer
    def get_queryset(self):
        user = self.kwargs['username']
        return UserToGuild.objects.filter(user__username=user)
# ----------------------------------------------------------


class PositionView(generics.ListCreateAPIView):
    queryset = Position.objects.all()
    serializer_class = PositionSerializer


# ----------------------------------------------------------


class RaidCreateView(generics.CreateAPIView):
    queryset = Raid.objects.all()
    serializer_class = RaidCreateSerializer

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

class RaidListView(generics.ListAPIView):
    serializer_class = RaidDetailSerializer
    def get_queryset(self):
        id = self.kwargs["guildid"]
        return Raid.objects.filter(guild=id)
    


# ----------------------------------------------------------


class GroupView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
