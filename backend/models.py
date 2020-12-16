from django.db import models

# Create your models here.


class User(models.Model):

    nickname = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=20, blank=False)

    def __str__(self):
        return self.nickname


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


class GuildPosiiton(models.Model):
    name = models.CharField(max_length=40, unique=True)
    has_many = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class UserToGuild(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    guild = models.ForeignKey(Guild, on_delete=models.CASCADE)
    guild_position = models.ForeignKey(
        GuildPosiiton, on_delete=models.SET_NULL, blank=True, null=True
    )


class Group(models.Model):
    slot = models.IntegerField()

    position_id = models.ForeignKey(Position, on_delete=models.CASCADE, unique=True)


class Raid(models.Model):
    name = models.CharField(max_length=45, unique=True)  # not unique?
    date = models.DateField()

    guild_id = models.ForeignKey(Guild, on_delete=models.CASCADE)
    group_id = models.ForeignKey(Group, on_delete=models.CASCADE)
