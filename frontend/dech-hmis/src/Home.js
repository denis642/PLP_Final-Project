import { Link } from 'react-router-dom';
import Footer from './Footer'; // Import the Footer component

const Home = () => {
    const containerStyle = {
        position: 'relative',
        height: '100vh', // Full viewport height
        width: '100vw',  // Full viewport width
        margin: '0',
        padding: '0',
        backgroundImage: "url('/img/hosi.jpeg')", 
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        filter: 'none',
        imageRendering: 'crisp-edges',
    };

    return (
        <div className="home" style={containerStyle}>
            {/* Main Content with Background Image */}
            <div className="login-container">
                <div className="login-box">
                    <h2>Patients Login</h2>
                    <Link to="/login-patient">
                        <button>Click here</button>
                    </Link>
                    <p>
                        Don't have an account? <Link to="/register-patient">Register</Link>
                    </p>
                </div>
                <div className="login-box">
                    <h2>Doctors Login</h2>
                    <Link to="/login-doctor">
                        <button>Click here</button>
                    </Link>
                    <p>
                        Don't have an account? <a href="/register-doctor">Register</a>
                    </p>
                </div>
                <div className="login-box">
                    <h2>Admin Login</h2>
                    <Link to="/login-admin">
                        <button>Click here</button>
                    </Link>
                    <p>
                        Don't have an account? <a href="/register-admin">Register</a>
                    </p>
                </div>
            </div>
            
        </div>
    );
}

export default Home;
