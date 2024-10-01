from django.db import models
from django.contrib.auth.models import User

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    email = models.EmailField(null=True, blank=True)
    gender = models.CharField(max_length=10)  # Ensure this matches
    phone = models.CharField(max_length=15)    # Ensure this matches

    def __str__(self):
        return self.user.username

class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    specialty = models.CharField(max_length=100)

    def __str__(self):
        return self.user.username

class Admin(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=50)

    def __str__(self):
        return self.user.username


class Schedule(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    appointment_date = models.DateField()
    start_time = models.TimeField()  # Starting time for the availability
    end_time = models.TimeField()    # Ending time for the availability
    is_booked = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.doctor.user.username} on {self.appointment_date} from {self.start_time} to {self.end_time}"


class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return f"Appointment of {self.patient} with {self.doctor} on {self.date} from {self.start_time} to {self.end_time}"
