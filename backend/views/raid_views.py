# -------------------------Raid------------------------
# views for Raid model C+ R+ U+ D
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


class RaidCreateView(generics.CreateAPIView):
    queryset = Raid.objects.all()
    serializer_class = RaidCreateSerializer

    def post(self, request):
        serializer = request.data
        user = User.objects.get(username=serializer["user"])
        this_user = UserToGuild.objects.get(user=user, guild_id=serializer["guild_id"])
        this_user_position = this_user.guild_position.id  # id roli w gildii usera
        guild = this_user.guild  # id gildii usera
        if this_user_position == 1 or this_user_position == 2:

            raid = Raid(name=serializer["name"], guild_id=guild.id)
            raid.save()
            dd = serializer.get("damage_slots")
            position = Position.objects.get(id=1)
            damage_slots = Group(slot=dd, raid=raid, position=position)
            damage_slots.save()
            tank = serializer.get("tank_slots")
            position = Position.objects.get(id=2)
            tank_slots = Group(slot=tank, raid=raid, position=position)
            tank_slots.save()
            healer = serializer.get("healer_slots")
            position = Position.objects.get(id=3)
            healer_slots = Group(slot=healer, raid=raid, position=position)
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

    def put(self, request, pk):
        data = request.data
        raid = Raid.objects.get(id=pk)
        # update list of dd for this raid
        position = Position.objects.get(id=1)
        dd_list = Group.objects.get(raid=raid, position=position).id
        new_dd_list = Group(id=dd_list, slot=data["dd_slots"], raid=raid)
        new_dd_list.save(force_update=True)
        # update list of tanks for this raid
        position = Position.objects.get(id=2)
        tank_list = Group.objects.get(raid=raid, position=position).id
        new_tank_list = Group(id=tank_list, slot=data["tank_slots"], raid=raid, position="Tank")
        new_tank_list.save(force_update=True)
        # update list of healers for this raid
        position = Position.objects.get(id=3)
        healer_list = Group.objects.get(raid=raid, position=position).id
        new_helaer_list = Group(id=healer_list, slot=data["healer_slots"], raid=raid, position="Healer")
        new_helaer_list.save(force_update=True)
        #update name of raid
        guild = Guild.objects.get(id=data["guild_id"])
        new_raid_name = Raid(id=raid.id, name=data["name"], guild=guild)
        new_raid_name.save()
        serializer = RaidDetailSerializer(raid)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        raid = Raid.objects.get(id=pk)
        connects = Group.objects.filter(raid=raid)
        for i in connects:
            i.delete()
        raid.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class RaidListView(generics.ListAPIView):
    serializer_class = RaidDetailSerializer

    def get_queryset(self):
        id = self.kwargs["guildid"]
        return Raid.objects.filter(guild=id)
