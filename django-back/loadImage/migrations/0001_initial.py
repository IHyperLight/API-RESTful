# Generated by Django 4.0.1 on 2022-02-07 21:18

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='imageModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_img', models.CharField(max_length=75, null=True)),
                ('url_img', models.ImageField(blank='', default='', upload_to='img/')),
                ('format_img', models.CharField(max_length=75, null=True)),
                ('created', models.DateTimeField(default=django.utils.timezone.now)),
                ('edited', models.DateTimeField(blank=True, default=None, null=True)),
            ],
        ),
    ]
