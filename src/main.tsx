import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AuthProvider from './providers/auth-provider/authProvider';
import Routes from './routes';
import { Toaster } from './components/ui/toaster';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster />
        <Routes />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
