'use client';

import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentProps } from './PaymentMethods';

export function BoletoPayment({ total, onPay }: PaymentProps) {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle>Boleto</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <p className="text-gray-700 text-sm">
          Clique no botão abaixo para gerar o boleto bancário.
        </p>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
          onClick={onPay}
        >
          <FileText className="w-4 h-4 mr-2" />
          Gerar boleto e pagar R$ {total.toFixed(2)}
        </Button>
      </CardContent>
    </Card>
  );
}
