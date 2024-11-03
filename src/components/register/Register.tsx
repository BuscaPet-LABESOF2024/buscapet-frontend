import { useCreateUser } from '@/api/user/hooks';
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
import { toast } from '@/hooks/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import type { AxiosError } from 'axios';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import ErrorsMessage from '../commons/FormErrorsMessage';
import { Separator } from '../ui/separator';
import { registerSchema } from './schema';
import type { RegisterFormSchema } from './types';

export default function Register() {
  const navigate = useNavigate();
  const { mutateAsync: createUser } = useCreateUser();

  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterFormSchema> = async (data) => {
    const { name, email, password } = data;

    try {
      await createUser({ name, email, password });

      toast({
        title: 'Conta criada com sucesso!',
        description: 'Faça login para acessar',
      });

      navigate('/login');
    } catch (error) {
      if ((error as AxiosError)?.response?.status === 401) {
        setError('email', {
          type: 'manual',
          message: 'Email ja existe',
        });
      }

      toast({
        title: 'Erro ao criar conta',
        description: 'Tente novamente',
      });
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-xl">
        <CardHeader>
          <Link to="/">
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
          <CardTitle className="text-2xl">Cadastro</CardTitle>
          <CardDescription>
            Insira seus dados para criar uma conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className='flex gap-4'>
                <div className="grid gap-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    type="name"
                    placeholder="Fulano da Silva"
                    {...register('name')}
                    required
                  />
                  {errors.name?.message && (
                    <ErrorsMessage
                      message={errors.name.message}
                      className="mt-1"
                    />
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="nome@email.com"
                    {...register('email')}
                    required
                  />
                  {errors.email?.message && (
                    <ErrorsMessage
                      message={errors.email.message}
                      className="mt-1"
                    />
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder='********'
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                </div>
                <Input
                  id="confirmPassword"
                  type="confirmPassword"
                  placeholder='********'
                  required
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword?.message && (
                  <ErrorsMessage
                    message={errors.confirmPassword.message}
                    className="mt-1"
                  />
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Você já tem uma conta?{' '}
              <Link to="/login" className="underline">
                Entre aqui
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
