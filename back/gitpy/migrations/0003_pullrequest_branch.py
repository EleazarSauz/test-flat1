# Generated by Django 2.2.13 on 2020-06-22 21:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gitpy', '0002_auto_20200622_0530'),
    ]

    operations = [
        migrations.AddField(
            model_name='pullrequest',
            name='branch',
            field=models.CharField(choices=[('B', 'base'), ('C', 'compare')], default='B', max_length=1),
        ),
    ]
