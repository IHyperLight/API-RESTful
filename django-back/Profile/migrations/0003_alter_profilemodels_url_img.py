# Generated by Django 4.0.1 on 2022-03-10 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0002_profilemodels_delete_profilemodel'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profilemodels',
            name='url_img',
            field=models.ImageField(blank='', default='', null=True, upload_to='img-profile/'),
        ),
    ]
