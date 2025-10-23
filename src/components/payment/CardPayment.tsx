'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import { PaymentProps } from './PaymentMethods';

export function CardPayment({ total, onPay }: PaymentProps) {
  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCard({ ...card, [e.target.name]: e.target.value });
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
        <Input
          placeholder="Nome impresso no cartão"
          name="name"
          value={card.name}
          onChange={handleChange}
        />
        <div className="flex gap-2">
          <Input
            placeholder="Validade (MM/AA)"
            name="expiry"
            value={card.expiry}
            onChange={handleChange}
          />
          <Input
            placeholder="CVV"
            name="cvv"
            value={card.cvv}
            onChange={handleChange}
          />
        </div>
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          onClick={onPay}
        >
          Pagar R$ {total.toFixed(2)}
        </Button>
      </CardContent>
    </Card>
  );
}
