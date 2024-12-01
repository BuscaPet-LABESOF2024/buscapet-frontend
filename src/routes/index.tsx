import Home from '../components/home/Home';
import RegisterPage from '../pages/register';
import PasswordRecovery from '../components/passwordRecovery/PasswordRecovery';
import Adoption from '../components/adoption/Adoption';
import MissingAnimal from '../components/lost-animal/LostAnimal';
import { useAuth } from '../providers/auth-provider/hook';
import { ProtectedRoute } from './ProtectedRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from '../pages/login';
import AnnouncementRegistrationPage from '../pages/announcement-registration';
import { ProfilePage } from '@/pages/profile-page';
import MyAnnoucementsPage from '@/pages/my-annoucements';
import AllAnnouncementsPage from '@/pages/all-announcements';

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/password-recovery',
      element: <PasswordRecovery />,
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/adoption',
          element: <Adoption />,
        },
        {
          path: '/lost-animal',
          element: <MissingAnimal />,
        },
        {
          path: '/announcement-registration',
          element: <AnnouncementRegistrationPage />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
        {
          path: '/my-announcements',
          element: <MyAnnoucementsPage />,
        },
        {
          path: '/all-announcements',
          element: <AllAnnouncementsPage />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [{}];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
