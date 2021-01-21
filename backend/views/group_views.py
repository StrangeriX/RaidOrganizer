from rest_framework import generics, status, permissions
from rest_framework.response import Response
from backend.models import (
    Group,
)
from backend.serializers import (
    GroupSerializer,
)

class GroupView(generics.ListCreateAPIView):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
