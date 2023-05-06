from django.urls import path, re_path
from django.conf.urls import include

# Imports
from loadImage.views import ImageView
from loadImage.views import ImagenViewDetail

urlpatterns = [
    re_path(r'^lista/$', ImageView.as_view()),
    re_path(r'^lista/(?P<pk>\d+)$', ImagenViewDetail.as_view()),
]