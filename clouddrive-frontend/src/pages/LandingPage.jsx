import { Link } from 'react-router-dom';
import '../LandingPage.css';
import ParticleBackground from './ParticleBackground';

function LandingPage() {
  return (
    <>
      <ParticleBackground />
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

        <div className="features-section">
          <div className="feature-card">
            <h3>🗂 Upload & Manage</h3>
            <p>Upload, organize, and manage your files securely in the cloud using our intuitive dashboard.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure Storage</h3>
            <p>Your files are stored with AWS S3 — providing encryption, reliability, and peace of mind.</p>
          </div>
          <div className="feature-card">
            <h3>🌍 Access Anywhere</h3>
            <p>Use CloudDrive from any device, anywhere in the world. Always fast, always responsive.</p>
          </div>
        </div>


        <footer className="landing-footer">
          Built by passionate developers. Powered by Cloud technologies.
        </footer>
      </div>
    </>
  );
}

export default LandingPage;
