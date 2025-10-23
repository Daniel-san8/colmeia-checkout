import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z
    .string()
    .min(8, { message: 'Senha deve ter no mínimo 8 caracteres' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/, {
      message:
        'Senha deve conter letra maiúscula, minúscula, número e caractere especial',
    }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
