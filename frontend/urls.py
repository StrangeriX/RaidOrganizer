from django.urls import path
from .views import index

urlpatterns = [
    path('', index),
    path('guild', index),
    path('create', index),
    path('guild/1', index)

]
