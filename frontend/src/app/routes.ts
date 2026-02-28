import { createBrowserRouter } from 'react-router';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/register',
    Component: RegistrationPage,
  },
  {
    path: '/admin',
    Component: AdminLoginPage,
  },
  {
    path: '/admin/dashboard',
    Component: AdminDashboard,
  },
]);
