from django.urls import path, re_path
from django.conf.urls import include

# view imports
from Registro.views import UserRegister

urlpatterns = [
    re_path(r'^crear/$', UserRegister.as_view()),
]