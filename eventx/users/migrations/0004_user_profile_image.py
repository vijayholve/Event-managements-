# Generated by Django 5.2.1 on 2025-05-24 20:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_remove_user_phone_alter_user_groups_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='profile_image',
            field=models.ImageField(blank=True, null=True, upload_to='event_profiles/'),
        ),
    ]
