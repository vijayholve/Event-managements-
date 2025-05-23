# Generated by Django 5.2.1 on 2025-05-13 08:11

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('events', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='VendorProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=255)),
                ('service_type', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('website', models.URLField(blank=True)),
                ('is_verified', models.BooleanField(default=False)),
                ('user', models.OneToOneField(limit_choices_to={'role': 'vendor'}, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='VendorBooking',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('approved', models.BooleanField(default=False)),
                ('requested_at', models.DateTimeField(auto_now_add=True)),
                ('event', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='events.event')),
                ('vendor', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='vendors.vendorprofile')),
            ],
        ),
    ]
