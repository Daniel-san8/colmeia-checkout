'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProductsContext } from '@/contexts/ProductsContexts';
import Image from 'next/image';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const { products } = useContext(ProductsContext);
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const user = loggedInUser ? JSON.parse(loggedInUser) : null;

    if (!user || !user.isLoggedIn) {
      router.push('/login');
    }
  }, [router]);

  const addProduct = (productId: number) => {
    const cart = sessionStorage.getItem('cart');
    const cartItems = cart ? JSON.parse(cart) : [];

    const productToAdd = products.find((product) => product.id === productId);
    if (!productToAdd) return;

    const existingProductIndex = cartItems.findIndex(
      (item: { id: number }) => item.id === productId
    );

    if (existingProductIndex >= 0) {
      cartItems[existingProductIndex].quantity += 1;
    } else {
      cartItems.push({ ...productToAdd, quantity: 1 });
    }

    sessionStorage.setItem('cart', JSON.stringify(cartItems));
  };

  return (
    <div className="w-full min-h-screen bg-[#F7F7F7]">
      <header className="w-full flex items-center p-4 shadow-sm bg-white">
        <Image
          src="/assets/logo-colmeia.jpg"
          width={80}
          height={80}
          alt="Logo"
          className="rounded-md"
        />
        <p className="ml-4 text-xl font-bold lg:text-3xl text-gray-800">
          Checkout Colmeia
        </p>
      </header>

      <main className="flex flex-col gap-4 p-4 mt-6 max-w-3xl mx-auto">
        {products.map((product) => (
          <Card
            key={product.id}
            className="flex bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={100}
              height={100}
              className="rounded-lg object-cover"
            />
            <div className="ml-4 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold text-gray-900">
                  R$ {product.price.toFixed(2)}
                </p>
                <Button
                  onClick={() => addProduct(product.id)}
                  className="cursor-pointer"
                >
                  Adicionar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </main>
    </div>
  );
}
