# Generated by Django 4.0.1 on 2022-01-27 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('primerComponente', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='primertabla',
            name='age',
            field=models.IntegerField(),
        ),
    ]