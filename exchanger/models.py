# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.utils.translation import ugettext as _
from django.db import models
from django.conf import settings


class Currency(models.Model):
    name = models.CharField(_('Nombre'), max_length=255)
    symbol = models.CharField(_('Símbolo monetario'), max_length=5)

    class Meta:
        verbose_name = "Moneda"
        verbose_name_plural = "Monedas"

    def __str__(self):
        return self.name

    def __unicode__(self):
        return u'%s' % (self.name)


class Wallet(models.Model):
    currency = models.ForeignKey(
        Currency,
        verbose_name=_('Moneda'),
        related_name='wallets'
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name=_('Dueño'),
        related_name='wallets'
    )

    balance = models.FloatField(_('Balance actual'), default=0)

    class Meta:
        verbose_name = "Billetera"
        verbose_name_plural = "Billeteras"

    def __str__(self):
        return self.currency.symbol + ' ' + str(
            self.balance) + ' -> ' + self.user.username

    def __unicode__(self):
        return u'%s%s%s%s%s' % (
            self.currency.symbol, ' ', str(
                self.balance), ' -> ', self.user.username)

    def same_currency(self, wallet):
        return wallet.currency == self.currency

    def can_send(self, amount):
        return (self.balance - amount) >= 0

    def sum(self, amount):
        self.balance += amount
        return self.save()

    def remove(self, amount):
        self.balance -= amount
        return self.save()


class Transaction(models.Model):
    amount = models.FloatField(_('Monto de la transacción'))
    date_time = models.DateTimeField(_('Fecha y Hora'), auto_now_add=True)

    from_wallet = models.ForeignKey(
        Wallet,
        verbose_name=_('Billetera desde'),
        related_name='transactions_made'
    )

    to_wallet = models.ForeignKey(
        Wallet,
        verbose_name=_('Billetera hasta'),
        related_name='transactions_obtained'
    )

    class Meta:
        verbose_name = "Transacción"
        verbose_name_plural = "Transacciones"
        ordering = ('date_time',)

    def __str__(self):
        from_user = ' From: ' + self.from_wallet.user.username
        from_to = from_user + ' To: ' + self.to_wallet.user.username
        return str(self.amount) + from_to + ' ' + str(self.date_time)

    def __unicode__(self):
        from_user = ' From: ' + self.from_wallet.user.username
        from_to = from_user + ' To: ' + self.to_wallet.user.username
        return u'%s%s%s%s%s' % (
            str(self.amount), ' ', from_to, ' ', str(self.date_time))

    def save(self, *args, **kwargs):
        """Check if transaction is between two same currency wallets."""
        same_currency = self.from_wallet.same_currency(self.to_wallet)
        has_enough_money = self.from_wallet.can_send(self.amount)

        if not same_currency:
            raise Exception('Wallets must have the same currency')
        elif not has_enough_money:
            raise Exception(
                'Owner wallet must have enought money for the transaction')
        else:
            #  Update the amount of the wallets
            self.from_wallet.remove(self.amount)
            self.to_wallet.sum(self.amount)

            super(Transaction, self).save(*args, **kwargs)
