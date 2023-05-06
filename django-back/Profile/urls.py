from django.urls import path, re_path
from django.conf.urls import include

# view imports
from Profile.views import ProfileView, ProfileViewDetail, ProfileUser

urlpatterns = [
    re_path(r'^list', ProfileView.as_view()),
    re_path(r'^user/(?P<pk>\d+)/$', ProfileViewDetail.as_view()),
    re_path(r'^update/(?P<pk>\d+)/$', ProfileUser.as_view()),
]
