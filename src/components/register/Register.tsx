import { useForm, type SubmitHandler } from 'react-hook-form';
import type { RegisterFormSchema } from './types';
import { registerSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import ErrorsMessage from '../commons/FormErrorsMessage';
import { useState } from 'react';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit: SubmitHandler<RegisterFormSchema> = (data) =>
    console.log(data);

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-6 gap-4 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center">
          <img
            className="w-[6rem] h-[6rem]"
            src="./img/logo-atual.png"
            alt="logo"
          />
          <span className="text-3xl font-bold text-purple-700">BuscaPet</span>
        </div>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Criar conta
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Nome completo
                  </label>
                  <input
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Fulano da Silva"
                    {...register('name')}
                  />
                  {errors.name?.message && (
                    <ErrorsMessage
                      message={errors.name.message}
                      className="mt-1"
                    />
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Seu e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="nome@email.com"
                    {...register('email')}
                  />
                  {errors.email?.message && (
                    <ErrorsMessage
                      message={errors.email.message}
                      className="mt-1"
                    />
                  )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Senha
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register('password')}
                />
                <button onClick={() => setShowPassword(!showPassword)} className='rounded-md hover:bg-gray-200 px-2 py-1 text-sm transition-all ease-in-out text-green-400 font-medium'  >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
                <div className='flex gap-2'>
                {errors.password?.message && (
                  <ErrorsMessage
                    message={errors.password.message}
                    className="mt-1"
                  />
                )}
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Confirmar senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  {...register('confirmPassword')}
                />
                {errors.confirmPassword?.message && (
                  <ErrorsMessage
                    message={errors.confirmPassword.message}
                    className="mt-1"
                  />
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-green-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Criar conta
              </button>
              <p className="text-sm font-light text-gray-500 text-center">
                Você já tem uma conta?{' '}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Entre aqui
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
