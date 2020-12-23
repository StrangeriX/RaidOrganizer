from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Position(models.Model):
    TANK = "Tank"
    HEALER = "Healer"
    DD = "DD"
    position_choise = [
        (TANK, "Tank"),
        (HEALER, "Healer"),
        (DD, "DD"),
    ]
    name = models.CharField(max_length=6, choices=position_choise, default=DD)


class Character(models.Model):
    name = models.CharField(max_length=30, unique=True)

    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    position = models.OneToOneField(Position, null=True, on_delete=models.SET_NULL)


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
    date = models.DateField(null=True)  # string comment chyba będzie lepszy??

    guild = models.ForeignKey(Guild, on_delete=models.CASCADE)


class Group(models.Model):
    slot = models.PositiveIntegerField()
    TANK = "Tank"
    HEALER = "Healer"
    DD = "DD"
    position_choise = [
        (TANK, "Tank"),
        (HEALER, "Healer"),
        (DD, "DD"),
    ]
    position = models.CharField(max_length=6, choices=position_choise, default=DD)
    raid = models.ForeignKey(Raid, on_delete=models.SET_NULL, null=True, blank=True)


class UserToGroup(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
