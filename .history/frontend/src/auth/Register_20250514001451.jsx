import React, { useState } from 'react';
import axios from 'axios';
import '../css/auth/register.css'; // Optional: Create this CSS file for custom styling
import { useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../features/base/config';
import l
function Register() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    role: '',
  });
  const navigate = useNavigate();

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(API_ENDPOINTS.REGISTER, form);

      navigate('/'); // Redirect to login page after successful registration
      console.log(res.data);
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        const firstError = Object.values(data)[0];
        setError(Array.isArray(firstError) ? firstError[0] : firstError);
      } else {
        setError('Something went wrong!');
      }
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        {error && <p className="error">{error}</p>}

        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <input
          name="password2"
          placeholder="Confirm Password"
          type="password"
          value={form.password2}
          onChange={handleChange}
          required
        />

<select name="role" value={form.role} onChange={handleChange} required>
  <option value="">Select Role</option>
  <option value="organizer">Organizer</option>
  <option value="attendee">Attendee</option>
  <option value="vendor">Vendor</option>
</select>


        <button type="submit">Register</button>
        <h2 className="text-1xl font-bold text-center text-gray-800 mb-6">
            Already having a account?
            <Link
              to={{
                pathname: "/register",
                
              }}
              className="text-grey"
            >Register</Link>
          </h2>
      </form>
    </div>
  );
}

export default Register;
