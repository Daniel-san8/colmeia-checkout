'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { LoginFormData, loginSchema } from './schema';
import Link from 'next/link';

type RegisterItem = {
  email: string;
  password: string;
  name: string;
  country: string;
};

export default function Login() {
  const navigation = useRouter();
  const [loginError, setLoginError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    const storedData = sessionStorage.getItem('registerData');
    const users: RegisterItem[] = storedData ? JSON.parse(storedData) : [];

    const user = users.find((u) => u.email === data.email);

    if (!user) {
      setLoginError('Usuário não encontrado');
      return;
    }

    if (user.password !== data.password) {
      setLoginError('Senha incorreta');
      return;
    }

    sessionStorage.setItem(
      'loggedInUser',
      JSON.stringify({ ...user, isLoggedIn: true, token: Date.now() })
    );

    setLoginError('');
    navigation.push('/');
  };

  return (
    <div className="flex justify-center items-center h-screen p-4 bg-[#F7F7F7]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Acesse sua conta</CardTitle>
          <CardDescription>Entre com seu email e senha!</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@exemplo.com"
                  required
                  {...register('email')}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  {...register('password')}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
              {loginError && (
                <span className="text-red-600 text-sm text-center">
                  {loginError}
                </span>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            form="login-form"
            type="submit"
            className="w-full cursor-pointer"
          >
            Login
          </Button>

          <p className="text-center">
            Não tem uma conta?{' '}
            <Link href="/register" className="text-blue-700 ml-2">
              Ir para o registro
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
