import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext'; // Importing UserContext to set the user globally

export default function Register() {
  const { setUser } = useUser(); // Access setUser from the context to update the global user
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    location: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add points to the formData before sending to the backend
    const dataToSend = { ...formData, points: 0 }; // Setting points to 0 for new users

    // Make the API request and get the response
    try {
      const response = await fetch('http://127.0.0.1:8080/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      setMessage(data.message || data.error);

      // Check if registration was successful
      if (response.ok) {
        // Update user in context with points data
        setUser({
          username: data.user,
          points: 0, // Set initial points to 0
          user_id: data.user_id,
        });

        // Navigate to the dashboard with the user data in the state
        navigate('/dashboard', { state: { user: data } });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setMessage('An error occurred during registration.');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
