import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Api from '../services/Api'; // Corrected import - using your capital 'A'

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post('/api/login/', formData); // <-- Using Api not axios
      const { access } = response.data;
      localStorage.setItem('accessToken', access);
      alert('Login successful!');
      navigate('/dashboard');
    } catch (error) {
      if (error.response?.status === 401) {
        alert('Invalid credentials.');
      } else {
        alert('Login failed. Please try again.');
      }
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        /><br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        /><br />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    </div>
  );
}

export default Login;
