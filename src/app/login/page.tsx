'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
      message:
        'Senha deve conter letra maiúscula, minúscula, número e caractere especial',
    }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const navigation = useRouter();

  const onSubmit = (data: LoginFormData) => {
    console.log('Dados do formulário:', data);
    const storedData = sessionStorage.getItem('registerData');
    const storedDataParsed: string[] = storedData ? JSON.parse(storedData) : [];
    console.log('Dados armazenados:', storedDataParsed);
    const findEmail = storedDataParsed.find(
      (item: any) => item.email === data.email
    );
    const findPassword = storedDataParsed.find(
      (item: any) => item.password === data.password
    );
    if (findEmail && findPassword) {
      alert('Login bem-sucedido!');
      navigation.push('/');
    } else {
      alert('Email ou senha incorretos. Tente novamente.');
    }
  };
  return (
    <div className="flex justify-center items-center h-screen p-4">
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
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                </div>
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
        </CardFooter>
      </Card>
    </div>
  );
}
