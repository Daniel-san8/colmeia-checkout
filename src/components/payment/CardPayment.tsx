'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

export function CardPayment() {
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
      <CardContent className="p-4 space-y-3">
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
        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
          Pagar com cartão
        </Button>
      </CardContent>
    </Card>
  );
}
