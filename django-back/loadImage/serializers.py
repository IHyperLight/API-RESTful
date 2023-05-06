from rest_framework import routers, serializers, viewsets

# Imports
from loadImage.models import ImageModel

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageModel
        fields = ('__all__')