from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from .models import Patient, Doctor, Admin, Appointment, Schedule
from .serializers import PatientSerializer, DoctorSerializer, AdminSerializer, AppointmentSerializer, ScheduleSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAdminUser

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['POST'])
def register_patient(request):
    if request.method == 'POST':
        data = request.data
        user = User.objects.create_user(username=data['name'], email=data['email'], password=data['password'])
        patient = Patient.objects.create(user=user, gender=data['gender'])
        serializer = PatientSerializer(patient)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

class UpdatePatientProfileView(APIView):
    def put(self, request):
        user = request.user
        try:
            patient = Patient.objects.get(user=user)
        except Patient.DoesNotExist:
            return Response({'error': 'Patient not found.'}, status=status.HTTP_404_NOT_FOUND)

        serializer = PatientSerializer(patient, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class BookAppointmentView(generics.CreateAPIView):
    serializer_class = AppointmentSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        # Check if the time slot is available in the schedule
        schedule = Schedule.objects.filter(
            doctor_id=data['doctor'], 
            appointment_date=data['date'], 
            start_time=data['start_time'],
            is_booked=False
        ).first()

        if not schedule:
            return Response({"error": "The selected time slot is not available."}, status=status.HTTP_400_BAD_REQUEST)

        # Create the appointment
        appointment = Appointment.objects.create(
            patient_id=data['patient'],
            doctor_id=data['doctor'],
            date=data['date'],
            start_time=data['start_time'],
            end_time=data['end_time']
        )

        # Mark the schedule slot as booked
        schedule.is_booked = True
        schedule.save()

        serializer = self.get_serializer(appointment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def register_doctor(request):
    if request.method == 'POST':
        data = request.data
        user = User.objects.create_user(username=data['name'], email=data['email'], password=data['password'])
        doctor = Doctor.objects.create(user=user, specialty=data['specialty'])
        serializer = DoctorSerializer(doctor)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def register_admin(request):
    if request.method == 'POST':
        data = request.data
        user = User.objects.create_user(username=data['name'], email=data['email'], password=data['password'])
        admin = Admin.objects.create(user=user, role=data['role'])
        serializer = AdminSerializer(admin)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_user(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = User.objects.filter(email=email).first()
    
    if user and user.check_password(password):
        tokens = get_tokens_for_user(user)
        
        if hasattr(user, 'patient'):
            role = 'patient'
            name = user.patient.user.username  # Accessing the patient's name
        elif hasattr(user, 'doctor'):
            role = 'doctor'
            name = user.doctor.user.username  # Accessing the doctor's name
        elif hasattr(user, 'admin'):
            role = 'admin'
            name = user.admin.user.username  # Accessing the admin's name
            
        return Response({'tokens': tokens, 'role': role, 'name': name}, status=status.HTTP_200_OK)
    
    return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def patient_dashboard(request):
    if hasattr(request.user, 'patient'):
        return Response({'message': 'Welcome to the patient dashboard'}, status=status.HTTP_200_OK)
    return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)

@api_view(['GET'])
def view_patients(request):
    if hasattr(request.user, 'doctor'):
        doctor = request.user.doctor
        patients = Patient.objects.filter(appointments__doctor=doctor).distinct()
        serializer = PatientSerializer(patients, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)

@api_view(['GET', 'POST'])
def manage_appointments(request):
    if hasattr(request.user, 'doctor'):
        doctor = request.user.doctor
        if request.method == 'GET':
            appointments = Appointment.objects.filter(doctor=doctor)
            serializer = AppointmentSerializer(appointments, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method == 'POST':
            appointment_id = request.data['appointment_id']
            new_time = request.data.get('new_time')
            appointment = Appointment.objects.get(id=appointment_id)
            if 'cancel' in request.data:
                appointment.delete()
                return Response({'message': 'Appointment canceled'}, status=status.HTTP_200_OK)
            if new_time:
                appointment.start_time = new_time
                appointment.save()
                return Response({'message': 'Appointment rescheduled'}, status=status.HTTP_200_OK)
    return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)

@api_view(['GET', 'POST'])
def manage_schedule(request):
    if hasattr(request.user, 'doctor'):
        doctor = request.user.doctor
        if request.method == 'GET':
            schedule = Schedule.objects.filter(doctor=doctor)
            serializer = ScheduleSerializer(schedule, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method == 'POST':
            appointment_date = request.data['appointment_date']
            start_time = request.data['start_time']
            end_time = request.data['end_time']
            Schedule.objects.create(doctor=doctor, appointment_date=appointment_date, start_time=start_time, end_time=end_time)
            return Response({'message': 'Time slot created successfully'}, status=status.HTTP_201_CREATED)
    return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
def available_slots(request, doctor_id, date):
    available_slots = Schedule.objects.filter(
        doctor_id=doctor_id, 
        appointment_date=date, 
        is_booked=False
    )
    serializer = ScheduleSerializer(available_slots, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'PUT'])
def doctor_profile(request):
    if hasattr(request.user, 'doctor'):
        doctor = request.user.doctor
        if request.method == 'GET':
            serializer = DoctorSerializer(doctor)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method == 'PUT':
            data = request.data
            doctor.user.first_name = data.get('first_name', doctor.user.first_name)
            doctor.user.last_name = data.get('last_name', doctor.user.last_name)
            doctor.specialty = data.get('specialty', doctor.specialty)
            doctor.user.email = data.get('email', doctor.user.email)
            doctor.user.save()
            doctor.save()
            return Response({'message': 'Profile updated successfully'}, status=status.HTTP_200_OK)
    return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def patient_profile(request):
    if hasattr(request.user, 'patient'):
        patient = request.user.patient
        if request.method == 'GET':
            serializer = PatientSerializer(patient)
            return Response(serializer.data, status=status.HTTP_200_OK)
        elif request.method == 'PUT':
            data = request.data
            patient.user.first_name = data.get('first_name', patient.user.first_name)
            patient.user.last_name = data.get('last_name', patient.user.last_name)
            patient.gender = data.get('gender', patient.gender)
            patient.user.email = data.get('email', patient.user.email)
            patient.user.save()
            patient.save()
            return Response({'message': 'Profile updated successfully'}, status=status.HTTP_200_OK)
    return Response({'error': 'Not authorized'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_availability(request):
    if hasattr(request.user, 'doctor'):
        data = request.data
        doctor = request.user.doctor
        date = data['appointment_date']
        time = data['appointment_time']

        # Check if schedule already exists
        schedule = Schedule.objects.filter(doctor=doctor, appointment_date=date, appointment_time=time).first()

        if schedule:
            return Response({"error": "This slot is already set"}, status=status.HTTP_400_BAD_REQUEST)

        # Create a new schedule
        schedule = Schedule.objects.create(
            doctor=doctor,
            appointment_date=date,
            appointment_time=time,
            is_booked=False
        )
        serializer = ScheduleSerializer(schedule)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({"error": "Only doctors can set availability"}, status=status.HTTP_403_FORBIDDEN)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_doctors(request):
    doctors = Doctor.objects.all()
    serializer = DoctorSerializer(doctors, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

# New AddUserView Class
class AddUserView(APIView):
    def post(self, request):
        user_type = request.data.get('user_type')
        data = request.data
        
        if user_type == 'patient':
            return register_patient(request)
        elif user_type == 'doctor':
            return register_doctor(request)
        elif user_type == 'admin':
            return register_admin(request)
        else:
            return Response({'error': 'Invalid user type'}, status=status.HTTP_400_BAD_REQUEST)


class RemoveUserView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            user.delete()
            return Response({'message': 'User deleted successfully'}, status=status.HTTP_204_NO_CONTENT)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)