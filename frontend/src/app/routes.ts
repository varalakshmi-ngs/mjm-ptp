import { createHashRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegistrationPage from './pages/RegistrationPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import GalleryPage from './pages/gallery';

export const router = createHashRouter([
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/register',
    Component: RegistrationPage,
  },
  {
    path: '/gallery',
    Component: GalleryPage,
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