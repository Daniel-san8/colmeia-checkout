'use client';

import { FileText, CreditCard, Ticket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentProps } from './PaymentMethods';
import { useState } from 'react';

export function BoletoPayment({ total, onPay }: PaymentProps) {
  const [boletoGerado, setBoletoGerado] = useState(false);
  const [boletoCodigo, setBoletoCodigo] = useState('');

  const gerarBoleto = () => {
    const codeBoleto = `23790.0000 0000 0000 0000 0000 ${Math.floor(
      Math.random() * 9000 + 1000
    )}`;
    setBoletoCodigo(codeBoleto);
    setBoletoGerado(true);
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle>Boleto</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3 w-full">
        {!boletoGerado ? (
          <>
            <p className="text-gray-700 text-sm">
              Clique no botão abaixo para gerar o boleto bancário.
            </p>
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center cursor-pointer"
              onClick={gerarBoleto}
            >
              <FileText className="w-4 h-4 mr-2" />
              Gerar boleto
            </Button>
          </>
        ) : (
          <>
            <p className="text-gray-700 text-sm">
              Boleto gerado com sucesso! Copie o código ou clique em pagar.
            </p>
            <div className="bg-gray-100 p-3 rounded-md flex flex-col items-center">
              <span className="font-mono text-sm mb-2">{boletoCodigo}</span>
              <Button
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center justify-center cursor-pointer"
                onClick={onPay}
              >
                <Ticket className="w-4 h-4 mr-2" />
                Pagar R$ {total.toFixed(2)}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
