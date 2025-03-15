import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext'; // Import the custom useUser hook

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Correctly use the useNavigate hook inside the functional component
  const navigate = useNavigate();

  // Use the useUser hook to get and set the user context
  const { setUser } = useUser(); // Assuming setUser is available in the context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setMessage(data.message || data.error); // Set either success or error message

      // If login is successful, update the context and navigate
      if (response.ok) {
        // Assuming the data returned includes user_id, points, and username
        const { user_id, points, user } = data;

        // Update the user context with the data from the backend
        setUser({ user_id, points, user });

        // Navigate to the dashboard, passing user data via state
        navigate('/dashboard', { state: { user: { user_id, points, user } } });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('An error occurred during login.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
