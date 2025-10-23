'use client';

import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';

export function PixPayment() {
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
      <CardContent className="p-4 space-y-3">
        <p className="text-gray-700 text-sm">
          Escaneie o QR Code abaixo ou copie o código Pix para pagamento.
        </p>

        <div className="flex flex-col items-center">
          <img
            src="/pix-qrcode.png"
            alt="QR Code Pix"
            className="w-40 h-40 object-contain mb-3"
          />
          <Button variant="outline" onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" />
            {copied ? 'Copiado!' : 'Copiar código Pix'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
