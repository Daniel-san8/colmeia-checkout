'use client';

import { ProductsContext } from '@/contexts/ProductsContexts';
import Image from 'next/image';
import { useContext } from 'react';

export default function Home() {
  const { products } = useContext(ProductsContext);
  const loggedInUser = sessionStorage.getItem('loggedInUser');
  const user = loggedInUser ? JSON.parse(loggedInUser) : null;

  if (!user || !user.isLoggedIn) {
    window.location.href = '/login';
    return null;
  }
  return (
    <div className="w-full h-screen bg-[#F7F7F7]">
      <header className="w-full flex ">
        <Image
          src={'/assets/logo-colmeia.jpg'}
          width={150}
          height={150}
          alt="Logo"
        />

        <p className="my-auto text-xl font-bold lg:text-4xl">
          Checkout Colmeia
        </p>
      </header>

      <main className="flex flex-col gap-2 p-2 mt-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex bg-white p-4 rounded-lg shadow-md"
          >
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={100}
              height={100}
              className="rounded-lg"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-lg font-bold mt-2">
                R$ {product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
