# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2017-12-11 13:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exchanger', '0003_auto_20171208_2055'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wallet',
            name='balance',
            field=models.FloatField(default=100, verbose_name='Balance actual'),
        ),
    ]
