# Generated by Django 4.0.4 on 2022-06-15 23:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('occurrences', '0006_categories_color'),
    ]

    operations = [
        migrations.AlterField(
            model_name='occurrences',
            name='cep',
            field=models.CharField(blank=True, max_length=50, null=True, verbose_name='CEP'),
        ),
    ]
