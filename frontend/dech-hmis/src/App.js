import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import Footer from "./Footer";
import RegisterPatient from './RegisterPatient';
import RegisterDoctor from "./RegisterDoctor";
import RegisterAdmin from "./RegisterAdmin";
import PatientLogin from "./PatientLogin";
import DoctorLogin from "./DoctorLogin";
import AdminLogin from "./AdminLogin";
import PatientDashboard from "./PatientDashboard";
import ManageProfile from "./ManageProfile";
import AvailableDoctors from "./AvailableDoctors";
import BookAppointment from "./BookAppointment";
import SearchDoctorBySpeciality from "./SearchDoctorBySpeciality";
import AvailableTimeSlots from "./AvailableTimeSlots";
import DoctorDashboard from './DoctorDashboard';
import DoctorProfile from './DoctorProfile';
import ViewPatients from "./ViewPatients";
import ManageAppointments from "./ManageAppointments";
import Logout from "./logout";
import AdminDashboard from "./AdminDashboard";
import AddRemoveUsers from "./AddRemoveUsers";
import EditUserProfiles from "./EditUserProfiles";
import ViewUserActivity from "./view_user_activity";
import RoleManagement from "./RoleManagement";
import ManageSchedule from "./ManageSchedule";
import About from "./About";
import Contact from "./Contact";

import { DoctorProvider } from "./DoctorContext"; // Import DoctorProvider
import { UserProvider } from "./UserContext"; // Import UserProvider

function App() {
  return (
    <UserProvider> {/* Wrap the application in UserProvider */}
      <DoctorProvider> {/* Wrap the application in DoctorProvider */}
        <Router>
          <div className="App">
            <ConditionalNavbar /> {/* Move ConditionalNavbar here */}

            {/* Define routes for different pages */}
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contacts" element={<Contact />} />
                <Route path="/register-patient" element={<RegisterPatient />} />
                <Route path="/register-doctor" element={<RegisterDoctor />} />
                <Route path="/register-admin" element={<RegisterAdmin />} />
                <Route path="/login-patient" element={<PatientLogin />} />
                <Route path="/login-doctor" element={<DoctorLogin />} />
                <Route path="/login-admin" element={<AdminLogin />} />
                <Route path="/patient-dashboard" element={<PatientDashboard />} />
                <Route path="/manage-profile" element={<ManageProfile />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="/search-doctor-specialty" element={<SearchDoctorBySpeciality />} />
                <Route path="/doctor-availability" element={<AvailableTimeSlots />} />
                <Route path="/view-doctors" element={<AvailableDoctors />} />
                <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor-profile" element={<DoctorProfile />} />
                <Route path="/view-patients" element={<ViewPatients />} />
                <Route path="/manage-appointments" element={<ManageAppointments />} />
                <Route path="/manage-schedule" element={<ManageSchedule />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/add_user" element={<AddRemoveUsers />} />
                <Route path="/edit-user-profiles" element={<EditUserProfiles />} />
                <Route path="/view-user-activity" element={<ViewUserActivity />} />
                <Route path="/role-management" element={<RoleManagement />} />
              </Routes>
            </div>
            
            <ConditionalFooter /> {/* Move Footer conditionally inside Router */}
          </div>
        </Router>
      </DoctorProvider>
    </UserProvider>
  );
}

// Conditional Navbar component
const ConditionalNavbar = () => {
  const location = useLocation(); // useLocation will now work
  const isAdminDashboard = location.pathname === "/admin-dashboard";

  return (
    <>
      {!isAdminDashboard && <Navbar />}
    </>
  );
};

// Conditional Footer component
const ConditionalFooter = () => {
  const location = useLocation(); // Get the current location
  const isHomePage = location.pathname === "/"; // Check if it's the home page

  return (
    <>
      {isHomePage && <Footer />} {/* Only render the footer on the home page */}
    </>
  );
};

export default App;
