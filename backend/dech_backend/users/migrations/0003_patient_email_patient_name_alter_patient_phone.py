# Generated by Django 5.1.1 on 2024-09-23 11:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_patient_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='email',
            field=models.EmailField(blank=True, max_length=254, null=True),
        ),
        migrations.AddField(
            model_name='patient',
            name='name',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='patient',
            name='phone',
            field=models.CharField(default=1, max_length=15),
            preserve_default=False,
        ),
    ]
