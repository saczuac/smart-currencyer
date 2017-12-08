from rest_framework import serializers
from .models import Currency, Wallet, Transaction
from django.contrib.auth.models import User


class UserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField(max_length=100)

    class Meta:
        model = User
        fields = ('username', 'email')


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('id', 'name', 'symbol')


class WalletSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    currency = CurrencySerializer(many=False, read_only=True)

    class Meta:
        model = Wallet
        fields = ('id', 'balance', 'user', 'currency')


class TransactionSerializer(serializers.ModelSerializer):
    from_wallet = WalletSerializer(many=False, read_only=True)
    to_wallet = WalletSerializer(many=False, read_only=True)

    class Meta:
        model = Transaction
        fields = ('id', 'amount', 'date_time', 'from_wallet', 'to_wallet')
