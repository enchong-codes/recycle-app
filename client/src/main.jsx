import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider, Link, createBrowserRouter } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import './index.css';
import App from './App';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import RecyclePage from './pages/subpages/RecyclePage';
import Quiz from './pages/subpages/Quiz';
import Leaderboard from './pages/subpages/Leaderboard';
import QuickFacts from './pages/subpages/QuickFacts';
import Resources from './pages/subpages/Resources';
import Rewards from './pages/subpages/Rewards';

// Setup router
const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/dashboard', element: <Dashboard /> },
  { path: '/recycle', element: <RecyclePage /> },
  { path: '/quiz', element: <Quiz /> },
  { path: '/leaderboard', element: <Leaderboard /> },
  { path: '/quickfacts', element: <QuickFacts /> },
  { path: '/resources', element: <Resources /> },
  { path: '/rewards', element: <Rewards /> },
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
