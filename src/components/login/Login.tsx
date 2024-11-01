import { useLogin } from '@/api/auth/hook';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/providers/auth-provider/hook';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import type { LoginFormSchema } from './types';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from './schema';
import type { AxiosError } from 'axios';
import ErrorsMessage from '../commons/FormErrorsMessage';
import { Separator } from '../ui/separator';

export default function Login() {
  const { setToken } = useAuth();
  const navigate = useNavigate();
  const { mutateAsync: handleLogin } = useLogin();
  const { toast } = useToast();

  // const [showPassword, setShowPassword] = useState(false);
  // const [openSnackbar, setOpenSnackBar] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
    setError,
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<LoginFormSchema> = async (data) => {
    const { email, password } = data;

    try {
      const result = await handleLogin({ email, password });

      toast({
        title: 'Login efetuado com sucesso!',
        description: 'Seja bem-vindo!',
      });

      setToken(result.token);
      navigate('/home');
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        return setError('email', {
          type: 'manual',
          message: 'Credenciais inválidas, tente novamente!',
        });
      }

      toast({
        title: 'Erro ao fazer login',
        description: 'Tente novamente mais tarde',
      });

      console.error(error);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto min-w-96">
        <CardHeader>
          <Link to="/home">
            <div className="flex justify-center items-center gap-1">
              <img
                className="w-[6rem] h-[6rem]"
                src="./img/logo-atual.png"
                alt="logo"
              />
              <h1 className="text-primary text-3xl font-bold">BuscaPet</h1>
            </div>
          </Link>
          <Separator />
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Entre com e-mail e senha para acessar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  {...register('email')}
                />
                {errors.email?.message && (
                  <ErrorsMessage
                    message={errors.email.message}
                    className="mt-1"
                  />
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    to={''}
                    className="ml-auto inline-block text-sm underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register('password')}
                />
                {errors.password?.message && (
                  <ErrorsMessage
                    message={errors.password.message}
                    className="mt-1"
                  />
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Não tem uma conta?{' '}
              <Link to="/register" className="underline">
                Cadastrar
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
