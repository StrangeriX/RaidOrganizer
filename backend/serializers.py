from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


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
    user = UsertToGuildCreateSerializer(write_only=True)

    class Meta:
        model = Guild
        fields = ("guild_name", "user")


class GuildSerializer(serializers.ModelSerializer):
    guild_master_name = serializers.SerializerMethodField()
    guild_members = serializers.SerializerMethodField()

    def get_guild_members(self, request):
        users = UserToGuild.objects.filter(guild_id=request.id)
        print("2nd print: ", users)
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
        fields = ["slot"]


class RaidSerializer(serializers.ModelSerializer):
    damage_slots = GroupSerializer()
    tank_slots = GroupSerializer()
    healer_slots = GroupSerializer()

    class Meta:
        model = Raid
        fields = (
            "name",
            "group_id",
            "date",
            "damage_slots",
            "tank_slots",
            "healer_slots",
        )


class RaidDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Raid
        fields = "__all__"
