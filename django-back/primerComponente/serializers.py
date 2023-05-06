from rest_framework import routers, serializers, viewsets

# import of models
from primerComponente.models import PrimerTabla


class PrimerTablaSerializer(serializers.ModelSerializer):
    class Meta:
        model = PrimerTabla
        fields = ('id', 'name', 'age')
