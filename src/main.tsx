import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Home from './components/home/Home.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RegisterPage from './pages/register/index.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Adoption from './components/adoption/Adoption.tsx';
import MissingAnimal from './components/missing-animal/MissingAnimal.tsx';
import Login from './components/login/Login.tsx';
import PasswordRecovery from './components/passwordRecovery/PasswordRecovery.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
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
  {
    path: '/adoption',
    element: <Adoption />,
  },
  {
    path: '/missing-animal',
    element: <MissingAnimal />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
