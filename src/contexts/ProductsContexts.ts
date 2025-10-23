'use client';
import React, { createContext, ReactNode, useState } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

type ProductsContextType = {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
};

export const ProductsContext = createContext<ProductsContextType>({
  products: [],
  setProducts: () => {},
});

const productsOn = [
  {
    id: 1,
    name: 'Lógica Socrática',
    price: 29.9,
    description:
      'Um livro que explora os fundamentos da lógica através do método socrático.',
    imageUrl: '/assets/logica_socratica.jpg',
  },
  {
    id: 2,
    name: 'Filosofia para Iniciantes',
    price: 39.9,
    description:
      'Uma introdução acessível aos principais conceitos e pensadores da filosofia.',
    imageUrl: '/assets/filosofia_iniciantes.jpg',
  },
  {
    id: 3,
    name: 'Ética e Moralidade',
    price: 34.9,
    description:
      'Uma análise profunda sobre os dilemas éticos e morais enfrentados pela humanidade.',
    imageUrl: '/assets/etica_moralidade.jpg',
  },
  {
    id: 4,
    name: 'Metafísica Moderna',
    price: 44.9,
    description:
      'Exploração dos conceitos metafísicos na filosofia contemporânea.',
    imageUrl: '/assets/metafisica_moderna.jpg',
  },
  {
    id: 5,
    name: 'Estética e Arte',
    price: 31.5,
    description: 'Um estudo sobre a natureza da beleza e a filosofia da arte.',
    imageUrl: '/assets/estetica_arte.jpg',
  },
  {
    id: 6,
    name: 'Filosofia da Ciência',
    price: 42.0,
    description:
      'Uma investigação sobre os fundamentos filosóficos da ciência e do método científico.',
    imageUrl: '/assets/filosofia_ciencia.jpg',
  },
  {
    id: 7,
    name: 'Existencialismo Contemporâneo',
    price: 37.8,
    description:
      'Uma análise das principais ideias do existencialismo na filosofia moderna.',
    imageUrl: '/assets/existencialismo_contemporaneo.jpg',
  },
  {
    id: 8,
    name: 'Filosofia Política',
    price: 45.0,
    description:
      'Um estudo sobre as teorias políticas e a filosofia do governo.',
    imageUrl: '/assets/filosofia_politica.jpg',
  },
];

export const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>(productsOn);

  return React.createElement(
    ProductsContext.Provider,
    { value: { products, setProducts } },
    children
  );
};
