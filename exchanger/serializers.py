from rest_framework import serializers
from .models import Currency, Wallet, Transaction
from django.contrib.auth.models import User


class UserSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    id = serializers.IntegerField()

    class Meta:
        model = User
        fields = ('id', 'username')


class CurrencySerializer(serializers.ModelSerializer):
    class Meta:
        model = Currency
        fields = ('id', 'name', 'symbol')


class WalletSerializer(serializers.ModelSerializer):
    user = UserSerializer(required=False)
    currency = CurrencySerializer()
    id = serializers.IntegerField(required=False)

    def create(self, validated_data):
        user = self.context['request'].user
        currency = Currency.objects.get(
            name=validated_data['currency']['name'])

        return Wallet.objects.create(currency=currency, user=user)

    class Meta:
        model = Wallet
        fields = ('id', 'balance', 'user', 'currency')


class TransactionSerializer(serializers.ModelSerializer):
    from_wallet = WalletSerializer(many=False)
    to_wallet = WalletSerializer(many=False)

    def create(self, validated_data):
        from_wallet = Wallet.objects.get(
            pk=validated_data['from_wallet']['id'])
        to_wallet = Wallet.objects.get(pk=validated_data['to_wallet']['id'])
        amount = validated_data['amount']
        transac = Transaction(
            to_wallet=to_wallet,
            from_wallet=from_wallet,
            amount=amount
        )
        transac = transac.save()
        try:
            error = transac.get('error', None)
        except:
            return transac
        else:
            if error:
                raise serializers.ValidationError({'detail': error})

    class Meta:
        model = Transaction
        fields = ('id', 'amount', 'date_time', 'from_wallet', 'to_wallet')
