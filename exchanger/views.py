# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.contrib.auth.models import User
from rest_framework import viewsets, status
from serializers import UserSerializer, CurrencySerializer
from serializers import TransactionSerializer, WalletSerializer
from rest_framework import permissions
from models import Currency, Transaction, Wallet
from django_filters import rest_framework
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)


class CurrencyViewSet(viewsets.ModelViewSet):
    queryset = Currency.objects.all()
    serializer_class = CurrencySerializer
    permission_classes = (permissions.IsAuthenticated,)

    @list_route()
    def havent_user(self, request):
        user_currencies = Wallet.objects.filter(
            user=request.user).values_list('currency', flat=True)
        currencies = Currency.objects.exclude(pk__in=user_currencies)

        if currencies:
            serializer = self.get_serializer(currencies, many=True)
            return Response(serializer.data)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    permission_classes = (permissions.IsAuthenticated,)


class WalletViewSet(viewsets.ModelViewSet):
    queryset = Wallet.objects.all()
    serializer_class = WalletSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (rest_framework.DjangoFilterBackend,)
    filter_fields = ('user__username',)

    def get_queryset(self):
        user = self.request.user
        return Wallet.objects.filter(user=user)

    @detail_route(methods=['post'])
    def get_wallet_of_user(self, request, pk=None):
        user = User.objects.get(pk=pk)
        wallets_of = Wallet.objects.filter(
            user=user).filter(currency=request.data['id'])

        if wallets_of:
            serializer = self.get_serializer(wallets_of, many=True)
            return Response(serializer.data)

        return Response(status=status.HTTP_400_BAD_REQUEST)
