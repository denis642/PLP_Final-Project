from django.urls import path
from .views import register_patient, register_doctor, register_admin, login_user, patient_dashboard, patient_profile
from .views import UpdatePatientProfileView
from .views import list_doctors,  view_patients
from .views import AddUserView, RemoveUserView
from .views import BookAppointmentView, available_slots, set_availability 






urlpatterns = [
    path('register/patient/', register_patient, name='register_patient'),
    path('register/doctor/', register_doctor, name='register_doctor'),
    path('register/admin/', register_admin, name='register_admin'),
    path('login/', login_user, name='login_user'),
    path('dashboard/patient/', patient_dashboard, name='patient_dashboard'),
    path('patient/profile/', patient_profile, name='patient_profile'),  # New path for patient profile
     path('update-patient-profile/', UpdatePatientProfileView.as_view(), name='update_patient_profile'),
    path('doctors/', list_doctors, name='list_doctors'),
    path('users/doctor/patients/', view_patients, name='view_patients'),
    path('users/add-user/', AddUserView.as_view(), name='add_user'),  # New path for adding users
    path('users/remove-user/<int:user_id>/', RemoveUserView.as_view(), name='remove_user'),  # New path for removing users 
    path('appointments/book/', BookAppointmentView.as_view(), name='book-appointment'),
    path('doctors/<int:doctor_id>/available-slots/<str:date>/', available_slots, name='available_slots'),
     path('doctors/set-availability/', set_availability, name='set_availability'),
    #   path('users/schedule/', set_availability, name='set_availability'),


]
