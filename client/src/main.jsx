import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, Link, createBrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import './index.css';
import App from './App';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import RecyclePage from './pages/RecyclePage';
import Quiz from './pages/Quiz';
import Leaderboard from './pages/Leaderboard';

// Setup router
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/recycle', element: <RecyclePage /> },
  { path: '/quiz', element: <Quiz /> },
  { path: '/leaderboard', element: <Leaderboard /> },
]);

// Rendering React app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <div className="phoneContainer">
        <RouterProvider router={router} />
      </div>
    </UserProvider>
  </StrictMode>
);
