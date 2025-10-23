'use client';

import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';
import Image from 'next/image';
import { PaymentProps } from './PaymentMethods';

export function PixPayment({ total, onPay }: PaymentProps) {
  const [copied, setCopied] = useState(false);
  const pixCode =
    '00020126360014BR.GOV.BCB.PIX0113+5599999999995204000053039865802BR5925LOJA DE EXEMPLO LTDA6009SAO PAULO62070503***6304ABCD';

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader>
        <CardTitle>Pix</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-3">
        <p className="text-gray-700 text-sm text-center">
          Escaneie o QR Code ou copie o código Pix para pagamento.
        </p>

        <Image
          src="/assets/pix-qrcode.svg"
          alt="QR Code Pix"
          width={160}
          height={160}
          className="object-contain rounded-lg shadow-sm"
          priority
        />

        <Button variant="outline" onClick={handleCopy}>
          <Copy className="w-4 h-4 mr-2" />
          {copied ? 'Copiado!' : 'Copiar código Pix'}
        </Button>

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
