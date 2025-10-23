'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export function BoletoPayment() {
  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardContent className="p-4 space-y-3">
        <p className="text-gray-700 text-sm">
          Clique no botão abaixo para gerar o boleto bancário.
        </p>

        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
          <FileText className="w-4 h-4 mr-2" />
          Gerar boleto
        </Button>
      </CardContent>
    </Card>
  );
}
