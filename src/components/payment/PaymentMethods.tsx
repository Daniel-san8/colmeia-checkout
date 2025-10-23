'use client';

import { useState } from 'react';
import { PixPayment } from './PixPayment';
import { BoletoPayment } from './BoletoPayment';
import { CardPayment } from './CardPayment';
import { OrderStatus } from './OrderStatus';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export interface PaymentProps {
  total: number;
  onPay: () => void;
}

type PaymentMethod = 'pix' | 'boleto' | 'card' | null;

export function PaymentMethods({ total }: { total: number }) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handleConfirmPayment = () => {
    if (!selectedMethod) {
      alert('Selecione um método de pagamento.');
      return;
    }
    setOrderConfirmed(true);

    sessionStorage.removeItem('cart');
  };

  if (orderConfirmed) {
    return <OrderStatus method={selectedMethod} total={total} />;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-semibold">Selecione o método de pagamento</h2>

      <div className="flex flex-col gap-3">
        <Card
          onClick={() => setSelectedMethod('pix')}
          className={`cursor-pointer border ${
            selectedMethod === 'pix' ? 'border-blue-600' : 'border-gray-200'
          }`}
        >
          <CardHeader>
            <CardTitle>Pix</CardTitle>
          </CardHeader>
          <CardContent>
            <PixPayment total={total} onPay={handleConfirmPayment} />
          </CardContent>
        </Card>

        <Card
          onClick={() => setSelectedMethod('boleto')}
          className={`cursor-pointer border ${
            selectedMethod === 'boleto' ? 'border-blue-600' : 'border-gray-200'
          }`}
        >
          <CardHeader>
            <CardTitle>Boleto</CardTitle>
          </CardHeader>
          <CardContent>
            <BoletoPayment total={total} onPay={handleConfirmPayment} />
          </CardContent>
        </Card>

        <Card
          onClick={() => setSelectedMethod('card')}
          className={`cursor-pointer border ${
            selectedMethod === 'card' ? 'border-blue-600' : 'border-gray-200'
          }`}
        >
          <CardHeader>
            <CardTitle>Cartão de Crédito</CardTitle>
          </CardHeader>
          <CardContent>
            <CardPayment total={total} onPay={handleConfirmPayment} />
          </CardContent>
        </Card>
      </div>

      {!orderConfirmed && (
        <Button
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleConfirmPayment}
        >
          Confirmar Pagamento
        </Button>
      )}
    </div>
  );
}
