'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const registerSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  name: z.string().min(2, { message: 'Nome muito curto' }),
  country: z.string().min(1, { message: 'Selecione um país' }),
  password: z
    .string()
    .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
      message:
        'Senha deve conter letra maiúscula, minúscula, número e caractere especial',
    }),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    console.log('Dados do formulário:', data);
  };

  return (
    <div className="p-4 w-full h-screen flex flex-col justify-center items-center bg-zinc-50 font-sans dark:bg-black">
      <header className="text-2xl py-2 font-bold mx-auto">
        Criar sua conta Comeia
      </header>

      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Insira os dados para criação de conta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="usuario@exemplo.com"
                  {...register('email')}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="name-completed">Nome Completo</Label>
                <Input id="name-completed" type="text" {...register('name')} />
                {errors.name && (
                  <span className="text-red-500 text-sm">
                    {errors.name.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="nation">Selecione o país</Label>
                <Select onValueChange={(value) => setValue('country', value)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecione o país" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Países</SelectLabel>
                      <SelectItem value="Brasil">Brasil</SelectItem>
                      <SelectItem value="Irlanda">Irlanda</SelectItem>
                      <SelectItem value="China">China</SelectItem>
                      <SelectItem value="EUA">EUA</SelectItem>
                      <SelectItem value="Paraguai">Paraguai</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {errors.country && (
                  <span className="text-red-500 text-sm">
                    {errors.country.message}
                  </span>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>
            </div>

            <CardFooter className="flex-col gap-2 mt-4">
              <Button type="submit" className="w-full cursor-pointer">
                Registrar
              </Button>
            </CardFooter>
          </form>

          <p className="text-center">
            Já tem uma conta?{' '}
            <a href="" className="text-blue-700 ml-2">
              Ir para o login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
