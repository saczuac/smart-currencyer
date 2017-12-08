# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from models import Currency, Wallet, Transaction

admin.site.register(Currency)
admin.site.register(Wallet)
admin.site.register(Transaction)
