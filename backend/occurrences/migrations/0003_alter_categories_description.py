# Generated by Django 4.0.4 on 2022-05-31 17:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('occurrences', '0002_rename_occurrencesactions_actions_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='categories',
            name='description',
            field=models.CharField(blank=True, max_length=320, null=True),
        ),
    ]