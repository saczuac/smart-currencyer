from django.conf.urls import url, include
from django.contrib import admin
from rest_framework.routers import DefaultRouter
from rest_framework_jwt.views import obtain_jwt_token
from exchanger import views

router = DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'wallets', views.WalletViewSet)
router.register(r'transactions', views.TransactionViewSet)
router.register(r'currencies', views.CurrencyViewSet)


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^admin/', admin.site.urls),
    url(r'^api-token-auth/', obtain_jwt_token),
]
