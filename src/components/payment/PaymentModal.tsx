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
import { OrderStatus } from './OrderStatus';

type Props = {
  open: boolean;
  onClose: () => void;
  total: number;
};

export function PaymentModal({ open, onClose, total }: Props) {
  const [method, setMethod] = useState<'pix' | 'boleto' | 'card'>('pix');
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const handlePay = () => {
    setOrderConfirmed(true);
  };

  if (orderConfirmed) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="max-w-sm w-[90%] rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold">
              Status do Pedido
            </DialogTitle>
          </DialogHeader>
          <OrderStatus method={method} total={total} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm w-[90%] rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-semibold">
            Escolha o método de pagamento
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={method}
          onValueChange={(v: string) =>
            setMethod(v as 'pix' | 'boleto' | 'card')
          }
          className="w-full mt-3"
        >
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger className="cursor-pointer" value="pix">
              Pix
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="boleto">
              Boleto
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="card">
              Cartão
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pix">
            <PixPayment total={total} onPay={handlePay} />
          </TabsContent>
          <TabsContent value="boleto">
            <BoletoPayment total={total} onPay={handlePay} />
          </TabsContent>
          <TabsContent value="card">
            <CardPayment total={total} onPay={handlePay} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
