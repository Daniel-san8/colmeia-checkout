'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProductsContext } from '@/contexts/ProductsContexts';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, ShoppingCart } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Home() {
  const { products } = useContext(ProductsContext);
  const navigation = useRouter();

  const [user, setUser] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);

  const getCart = () => {
    const cart = sessionStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };

  const saveCart = (cartItems: any[]) => {
    sessionStorage.setItem('cart', JSON.stringify(cartItems));
    setCartCount(cartItems.reduce((acc, item) => acc + item.quantity, 0));
  };

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('loggedInUser');
    const parsedUser = loggedInUser ? JSON.parse(loggedInUser) : null;

    if (!parsedUser?.isLoggedIn) {
      navigation.push('/login');
    } else {
      setUser(parsedUser);
      const cartItems = getCart();
      setCartCount(
        cartItems.reduce(
          (acc: number, item: { quantity: number }) => acc + item.quantity,
          0
        )
      );
    }
  }, []);

  const addProduct = (productId: number) => {
    const cartItems = getCart();
    const productToAdd = products.find((p) => p.id === productId);
    if (!productToAdd) return;

    const index = cartItems.findIndex((item: any) => item.id === productId);
    if (index >= 0) {
      cartItems[index].quantity += 1;
    } else {
      cartItems.push({ ...productToAdd, quantity: 1 });
    }

    saveCart(cartItems);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('loggedInUser');
    sessionStorage.removeItem('cart');
    navigation.push('/login');
  };

  if (!user) {
    return null;
  }

  return (
    <div className="w-full min-h-screen bg-[#F7F7F7]">
      <header className="w-full flex items-center p-4 shadow-sm bg-white relative">
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

        <Button
          onClick={() => navigation.push('/cart')}
          className="ml-auto relative cursor-pointer"
          variant="outline"
          size="icon"
        >
          <ShoppingCart className="w-5 h-5" />
          {cartCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs bg-black text-white">
              {cartCount}
            </Badge>
          )}
        </Button>

        <Button
          onClick={handleLogout}
          variant="outline"
          size="icon"
          className="flex items-center justify-center ml-1 cursor-pointer"
        >
          <LogOut className="w-5 h-5" />
        </Button>
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
            <div className="ml-4 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-600 text-sm">{product.description}</p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold text-gray-900">
                  R$ {product.price.toFixed(2)}
                </p>
                <Button
                  className="cursor-pointer"
                  onClick={() => addProduct(product.id)}
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
