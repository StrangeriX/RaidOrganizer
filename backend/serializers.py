from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

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


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = ("name", "position")


class UserCharacterSerializer(serializers.ModelSerializer):
    position_name = serializers.SerializerMethodField()
    username = serializers.SerializerMethodField()

    def get_username(self, request):
        user = request.user
        return user.username

    def get_position_name(self, request):
        position = Position.objects.get(id=request.position_id)
        return position.name

    class Meta:
        model = Character
        fields = ("id", "name", "user", "username", "position_name")






class GuildListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guild
        fields = "__all__"


class UsertToGuildCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserToGuild
        fields = ("user", "guild_position")


class GuildCreateSerializer(serializers.ModelSerializer):
    user_name = serializers.CharField()

    class Meta:
        model = Guild
        fields = "__all__"


class GuildSerializer(serializers.ModelSerializer):
    guild_master_name = serializers.SerializerMethodField()
    guild_members_count = serializers.SerializerMethodField()
    guild_members = serializers.SerializerMethodField()
    raids = serializers.SerializerMethodField()


    def get_raids(self, request):
        raid = Raid.objects.filter(guild=request.id)
        raids = []
        for i in raid:
            raids.append([i.name, i.id])
        return raids

    def get_guild_members_count(self, request):
        users = UserToGuild.objects.filter(guild_id=request.id)
        count = 0
        for i in users:
            count += 1
        return count

    def get_guild_members(self, request):
        users = UserToGuild.objects.filter(guild_id=request.id).order_by('guild_position')
        members = []
        for i in users:
            members.append([i.user.username, i.guild_position.name])
        return members

    def get_guild_master_name(self, request):
        users = UserToGuild.objects.filter(guild_id=request.id)
        for i in users:
            user = UserToGuild.objects.get(id=i.id)
            if user.guild_position_id == 1:
                guild_master = user.user_id
            name = User.objects.filter(id=guild_master)
            return name[0].username

    class Meta:
        model = Guild
        fields = (
            "id",
            "guild_name",
            "guild_master_name",
            "guild_members_count",
            "guild_members",
            "raids",
        )


class UserToGuildSerializer(serializers.ModelSerializer):
    guild_name = serializers.SerializerMethodField()
    guild_position_name = serializers.SerializerMethodField()


    def get_guild_name(self, request):
        name = request.guild
        return name.guild_name

    def get_guild_position_name(self, request):
        position = request.guild_position
        return position.name

    class Meta:
        model = UserToGuild
        fields = ("id", "guild_name", "user", "guild", "guild_position", "guild_position_name")

class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = "__all__"


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"


class RaidCreateSerializer(serializers.ModelSerializer):
    damage_slots = serializers.IntegerField()
    tank_slots = serializers.IntegerField()
    healer_slots = serializers.IntegerField()

    class Meta:
        model = Raid
        fields = (
            "name",
            "damage_slots",
            "tank_slots",
            "healer_slots",
        )


class RaidDetailSerializer(serializers.ModelSerializer):
    dd_list = serializers.SerializerMethodField()
    tank_list = serializers.SerializerMethodField()
    healer_list = serializers.SerializerMethodField()

    def get_dd_list(self, request):
        groups = Group.objects.filter(raid=request.id)
        dd_group = groups.get(position="DD")
        users = UserToGroup.objects.filter(group_id=dd_group)
        members = []
        for user in users:
            member = User.objects.get(id=user.user_id)
            members.append(member.username)
        return members

    def get_tank_list(self, request):
        groups = Group.objects.filter(raid=request.id)
        dd_group = groups.get(position="Tank")
        users = UserToGroup.objects.filter(group_id=dd_group)
        members = []
        for user in users:
            member = User.objects.get(id=user.user_id)
            members.append(member.username)
        return members

    def get_healer_list(self, request):
        groups = Group.objects.filter(raid=request.id)
        dd_group = groups.get(position="Healer")
        users = UserToGroup.objects.filter(group_id=dd_group)
        members = []
        for user in users:
            member = User.objects.get(id=user.user_id)
            members.append(member.username)
        return members

    class Meta:
        model = Raid
        fields = ("id", "guild", "name", "dd_list", "tank_list", "healer_list")
