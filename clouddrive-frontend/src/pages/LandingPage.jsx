import { Link } from 'react-router-dom';
import '../LandingPage.css'; // import your external CSS file

function LandingPage() {
  return (
    <div className="landing-container">
      <h1 className="landing-title">
        Welcome to <span className="highlight">CloudDrive</span>
      </h1>
      <p className="landing-description">
        CloudDrive is your secure, private cloud storage solution —  
        Upload, access, and manage your important files from anywhere, anytime.  
        Built with <b>React.js</b>, <b>Django</b>, <b>AWS S3</b> for real-world reliability.
      </p>

      <div className="landing-buttons">
        <Link to="/login">
          <button className="btn login-btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="btn signup-btn">Signup</button>
        </Link>
      </div>

      <footer className="landing-footer">
        Built by passionate developers. Powered by Cloud technologies.
      </footer>
    </div>
  );
}

export default LandingPage;
