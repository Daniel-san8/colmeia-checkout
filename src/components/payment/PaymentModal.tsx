'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PixPayment } from './PixPayment';
import { BoletoPayment } from './BoletoPayment';
import { CardPayment } from './CardPayment';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function PaymentModal({ open, onClose }: Props) {
  const [method, setMethod] = useState('pix');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Escolha o método de pagamento
          </DialogTitle>
        </DialogHeader>

        <Tabs value={method} onValueChange={setMethod} className="w-full mt-3">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="pix">Pix</TabsTrigger>
            <TabsTrigger value="boleto">Boleto</TabsTrigger>
            <TabsTrigger value="cartao">Cartão</TabsTrigger>
          </TabsList>

          <TabsContent value="pix">
            <PixPayment />
          </TabsContent>
          <TabsContent value="boleto">
            <BoletoPayment />
          </TabsContent>
          <TabsContent value="cartao">
            <CardPayment />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
