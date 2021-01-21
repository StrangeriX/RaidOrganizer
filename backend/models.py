from django.db import models
from django.contrib.auth.models import User

TANK = "Tank"
HEALER = "Healer"
DD = "DD"
position_choise = [
    (TANK, "Tank"),
    (HEALER, "Healer"),
    (DD, "DD"),
]


class Position(models.Model):
    name = models.CharField(max_length=6, choices=position_choise, default=DD)


class Character(models.Model):
    name = models.CharField(max_length=30, unique=True)

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    position = models.ForeignKey(Position, null=True, on_delete=models.SET_NULL)


class Guild(models.Model):
    guild_name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.guild_name


class GuildPosition(models.Model):
    name = models.CharField(max_length=40, unique=True)
    has_many = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class UserToGuild(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    guild = models.ForeignKey(Guild, on_delete=models.CASCADE)
    guild_position = models.ForeignKey(
        GuildPosition, on_delete=models.SET_NULL, blank=False, null=True
    )


class Raid(models.Model):
    name = models.CharField(max_length=45)
    guild = models.ForeignKey(Guild, on_delete=models.CASCADE)

    def __str__(self):
        return (self.name+" "+self.guild.guild_name)


class Group(models.Model):
    slot = models.PositiveIntegerField()

    position = models.ForeignKey(Position, on_delete=models.CASCADE, null=True)
    raid = models.ForeignKey(Raid, on_delete=models.SET_NULL, null=True, blank=True)


class UserToGroup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
