import Home from '../components/home/Home';
import RegisterPage from '../pages/register';
import Login from '../components/login/Login';
import PasswordRecovery from '../components/passwordRecovery/PasswordRecovery';
import Adoption from '../components/adoption/Adoption';
import MissingAnimal from '../components/missing-animal/MissingAnimal';
import { useAuth } from '../providers/auth-provider/hook';
import { ProtectedRoute } from './ProtectedRoute';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Routes = () => {
  const { token } = useAuth();

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
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/password-recovery',
      element: <PasswordRecovery />,
    },
  ];

  const router = createBrowserRouter([
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;