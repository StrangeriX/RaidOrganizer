# -----------------------Guild------------------------------
# views for Guild model C+ R+ U+ D+
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from backend.models import (
    Guild,
    UserToGuild,
    User,
)
from backend.serializers import (
    GuildCreateSerializer,
    GuildSerializer,
)


class GuildCreate(generics.CreateAPIView):
    queryset = Guild.objects.all()
    serializer_class = GuildCreateSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        user = User.objects.get(username=data["user_name"])
        guild = Guild(guild_name=data["guild_name"])
        guild.save()
        userto = UserToGuild(user=user, guild=guild, guild_position_id=1)
        userto.save()
        serializer = GuildSerializer(guild)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class GuildListView(generics.ListAPIView):
    queryset = Guild.objects.all()
    serializer_class = GuildSerializer

    def get(self, request, username):
        # guild = Guild.objects.all()
        user = User.objects.get(username=username)
        userto = UserToGuild.objects.filter(user=user)
        guilds = []
        for i in userto:
            guild = Guild.objects.get(id=i.guild_id)
            guilds.append(guild.id)
        guild_list = Guild.objects.all().exclude(id__in=guilds)
        serializer = GuildSerializer(guild_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class GuildDetail(generics.ListAPIView):
    queryset = Guild.objects.all()
    serializer_class = GuildSerializer
    permission_classes = [permissions.IsAuthenticated]

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

    def put(self, request, pk):
        guild = Guild.objects.get(id=pk)
        new_guild = Guild(id=guild.id, guild_name=request.data["name"])
        new_guild.save()
        serializer = GuildSerializer(guild)
        return Response(serializer.data, status=status.HTTP_200_OK)
