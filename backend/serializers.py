from rest_framework import serializers

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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email")


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email", "password")


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = "__all__"


class UserToGuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserToGuild
        fields = "__all__"


class GuildListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guild
        fields = "__all__"


class UsertToGuildCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserToGuild
        fields = ("user", "guild_position")


class GuildCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guild
        fields = "__all__"


class GuildSerializer(serializers.ModelSerializer):
    guild_master_name = serializers.SerializerMethodField()
    guild_members = serializers.SerializerMethodField()

    def get_guild_members(self, request):
        users = UserToGuild.objects.filter(guild_id=request.id)
        members = []
        for i in users:
            members.append(i.user.username)
        return members

    def get_guild_master_name(self, request):
        user = UserToGuild.objects.filter(guild_position_id=1).values()
        user_id = user[0].get("user_id")
        return User.objects.get(id=user_id).username

    class Meta:
        model = Guild
        fields = ("guild_name", "guild_master_name", "guild_members")


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
        fields = "__all__"

