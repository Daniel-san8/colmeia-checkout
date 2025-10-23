'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { z } from 'zod';
import { PaymentProps } from './PaymentMethods';

const cardSchema = z.object({
  number: z
    .string()
    .min(16, 'Número do cartão deve ter 16 dígitos')
    .max(16, 'Número do cartão deve ter 16 dígitos'),
  name: z.string().min(1, 'Nome é obrigatório'),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Validade deve ser MM/AA'),
  cvv: z.string().length(3, 'CVV deve ter 3 dígitos'),
});

export function CardPayment({ total, onPay }: PaymentProps) {
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCard({ ...card, [e.target.name]: e.target.value });
  };

  const handlePay = () => {
    const result = cardSchema.safeParse(card);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const key = err.path[0];
        if (key) fieldErrors[String(key)] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onPay();
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle>Cartão de Crédito</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Input
          placeholder="Número do cartão"
          name="number"
          value={card.number}
          onChange={handleChange}
        />
        {errors.number && (
          <p className="text-red-600 text-sm">{errors.number}</p>
        )}

        <Input
          placeholder="Nome impresso no cartão"
          name="name"
          value={card.name}
          onChange={handleChange}
        />
        {errors.name && <p className="text-red-600 text-sm">{errors.name}</p>}

        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Validade (MM/AA)"
              name="expiry"
              value={card.expiry}
              onChange={handleChange}
            />
            {errors.expiry && (
              <p className="text-red-600 text-sm">{errors.expiry}</p>
            )}
          </div>
          <div className="flex-1">
            <Input
              placeholder="CVV"
              name="cvv"
              value={card.cvv}
              onChange={handleChange}
            />
            {errors.cvv && <p className="text-red-600 text-sm">{errors.cvv}</p>}
          </div>
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handlePay}
        >
          Pagar R$ {total.toFixed(2)}
        </Button>
      </CardContent>
    </Card>
  );
}
