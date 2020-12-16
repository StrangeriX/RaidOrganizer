from rest_framework import serializers
from .models import *


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["nickname"]


class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"


class CharacterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Character
        fields = "__all__"


class GuildSerializer(serializers.ModelSerializer):

    guild_master_name = serializers.SerializerMethodField()

    def get_guild_master_name(self, request):
        user = UserToGuild.objects.filter(guild_position_id=1).values()
        user_id = user[0].get("user_id")
        return User.objects.get(id=user_id).nickname

    class Meta:
        model = Guild
        fields = ("guild_name", "guild_master_name")


class UserToGuildSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserToGuild
        fields = "__all__"


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = "__all__"


class RaidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Raid
        fields = "__all__"


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = "__all__"
