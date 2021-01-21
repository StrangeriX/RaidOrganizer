# ---------------------Character--------------------------
# views for Character model   C+ R+ U D+
from rest_framework import generics, status, permissions
from rest_framework.response import Response
from backend.models import (
    Position,
    Character,
    User,
)
from ..serializers import (
    UserCharacterSerializer,
    CharacterSerializer,
)


class CharactersView(generics.CreateAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        username = data['username']
        user = User.objects.get(username=username)
        position_id = data["position"]
        position = Position(id=position_id)
        new_character = Character(name=data["name"], user=user, position=position)
        new_character.save()
        return Response(status=status.HTTP_201_CREATED)


# destroying and updating characters
class CharacterRetriveView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Character.objects.all()
    serializer_class = CharacterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, pk):
        data = request.data
        char = Character.objects.get(id=pk)
        position = Position.objects.get(id=data["position"])
        char = Character(id=pk, name=data["name"], position=position)
        char.save(force_update=True)
        return Response(status=status.HTTP_200_OK)


# geting list of characters by username
class UserCharacterView(generics.ListAPIView):
    serializer_class = UserCharacterSerializer

    def get_queryset(self):
        username = self.kwargs['username']
        return Character.objects.filter(user__username=username)
