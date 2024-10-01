from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Patient, Doctor, Admin, Appointment, Schedule  # Ensure to import Schedule

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class PatientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = ['id', 'name', 'email', 'gender', 'phone']

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Doctor
        fields = ['user', 'specialty']

class AdminSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Admin
        fields = ['user', 'role']

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = ['patient', 'doctor', 'date', 'start_time', 'end_time']  # Specify relevant fields

class ScheduleSerializer(serializers.ModelSerializer):  # Add this serializer
    class Meta:
        model = Schedule
        fields = '__all__'  # or specify the fields you want to serialize
