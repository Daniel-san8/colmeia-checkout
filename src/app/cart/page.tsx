'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Minus, Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { PaymentModal } from '@/components/payment/PaymentModal';

interface CartItem {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity: number;
}

export default function Cart() {
  const [stored, setStored] = useState<CartItem[]>([]);
  const [openPayment, setOpenPayment] = useState(false);

  const subtotal = stored.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 0 ? 12.9 : 0;
  const total = subtotal + deliveryFee;

  useEffect(() => {
    const storedCart = sessionStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart);
        const withQuantity = parsed.map((item: any) => ({
          ...item,
          quantity: item.quantity || 1,
        }));
        setStored(withQuantity);
      } catch {
        console.error('Erro ao ler o carrinho do sessionStorage');
      }
    }
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setStored(newCart);
    sessionStorage.setItem('cart', JSON.stringify(newCart));
  };

  const handleRemove = (id: number) => {
    const updated = stored.filter((p) => p.id !== id);
    updateCart(updated);
  };

  const handleQuantityChange = (id: number, delta: number) => {
    const updated = stored
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
      .filter((item) => item.quantity > 0);
    updateCart(updated);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-6 flex flex-col gap-4">
      <h1 className="text-2xl font-semibold text-gray-900 mb-2">
        Meu Carrinho
      </h1>

      {stored.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">
          Seu carrinho está vazio 😔
        </p>
      ) : (
        <>
          <section className="flex flex-col gap-3">
            {stored.map((item) => (
              <Card
                key={item.id}
                className="flex items-center gap-4 p-3 shadow-sm border border-gray-200"
              >
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />

                <CardContent className="flex flex-col flex-1 p-0">
                  <h2 className="font-medium text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-semibold text-blue-600">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleQuantityChange(item.id, -1)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="text-sm font-medium w-5 text-center">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleQuantityChange(item.id, +1)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>

                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemove(item.id)}
                >
                  <Trash2 className="w-5 h-5 text-gray-500" />
                </Button>
              </Card>
            ))}
          </section>

          <Separator className="my-4 bg-gray-200" />

          <section className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="text-gray-800 font-medium">
                R$ {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Entrega</span>
              <span className="text-gray-800 font-medium">
                R$ {deliveryFee.toFixed(2)}
              </span>
            </div>

            <Separator className="my-2 bg-gray-200" />

            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span className="text-blue-600">R$ {total.toFixed(2)}</span>
            </div>

            <Button
              onClick={() => setOpenPayment(true)}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium"
            >
              Finalizar Pedido
            </Button>
            <PaymentModal
              open={openPayment}
              onClose={() => setOpenPayment(false)}
            />
          </section>
        </>
      )}
    </main>
  );
}
