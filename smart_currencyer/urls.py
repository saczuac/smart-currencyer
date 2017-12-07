from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# router.register(r'some', views.SomeViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^api-auth/',
        include('rest_framework.urls', namespace='rest_framework')),
]
