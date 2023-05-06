from rest_framework import routers, serializers, viewsets

# import of models
from Profile.models import ProfileModels


class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = ProfileModels
        fields = ('__all__')
