import * as z from 'zod';

export const registerSchema = z.object({
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

export type RegisterFormData = z.infer<typeof registerSchema>;
