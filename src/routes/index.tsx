import Home from '../components/home/Home';
import RegisterPage from '../pages/register';
import PasswordRecovery from '../components/passwordRecovery/PasswordRecovery';
import Adoption from '../components/adoption/Adoption';
import MissingAnimal from '../components/missing-animal/MissingAnimal';
import { useAuth } from '../providers/auth-provider/hook';
import { ProtectedRoute } from './ProtectedRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { LoginPage } from '../pages/login';
import AnnouncementRegistrationPage from '../pages/announcement-registration';

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
          path: '/missing-animal',
          element: <MissingAnimal />,
        },
        {
          path: '/announcement-registration',
          element: <AnnouncementRegistrationPage />,
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {}
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
