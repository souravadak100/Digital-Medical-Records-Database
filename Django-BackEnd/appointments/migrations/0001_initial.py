# Generated by Django 2.2.11 on 2020-03-07 04:24

from django.db import migrations, models
import django.db.models.deletion

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('patients', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='BookAppointments',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('disease', models.CharField(max_length=255)),
                ('date', models.DateField()),
                ('timings', models.CharField(max_length=255)),
                ('description', models.CharField(max_length=255)),
                ('patients', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bookappointments', to='patients.Register')),
            ],
        ),
    ]