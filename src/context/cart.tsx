import { createContext, useContext, useState } from 'react';

import { BoxProps } from '@chakra-ui/layout';

import Cookies from 'js-cookie';

interface Props extends BoxProps {}

export interface CartItens {
  id: string;
  src: string;
  description: string;
  amount?: string;
  details?: string;
}

interface Context {
  cartList: CartItens[];
  setCartList: (list: CartItens[]) => void;
  cartLength: number;
  setCartLength: (length: number) => void;
}

const CartContext = createContext<Context>({} as Context);

const cookie = Cookies.get('cart') || '[]';

const cart: CartItens[] = JSON.parse(cookie);

export default function Provider({ children }: Props) {
  const [cartList, setCartList] = useState<CartItens[]>(cart);
  const [cartLength, setCartLength] = useState<number>(cart.length);

  return (
    <CartContext.Provider
      value={{ cartList, setCartList, cartLength, setCartLength }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  return context;
}
