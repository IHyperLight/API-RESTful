from django.urls import path, include, re_path
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from django.views.static import serve

# Imports for images
from django.conf import settings
from django.conf.urls.static import static


# Serializers define the API representation.
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ["url", "username", "email", "is_staff"]


# ViewSets define the view behavior.
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r"users", UserViewSet)

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path("", include(router.urls)),
    re_path(r"^api/", include("Login.urls")),
    re_path(r"^api/v1/registro/", include("Registro.urls")),
    re_path(r"^api/v1/primer_componente/", include("primerComponente.urls")),
    re_path(r"^api/v1/loadImage/", include("loadImage.urls")),
    re_path(r"assets/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
    re_path(r"^api/v1/profile/", include("Profile.urls")),
    path("api-auth/", include("rest_framework.urls", namespace="rest_framework")),
]
