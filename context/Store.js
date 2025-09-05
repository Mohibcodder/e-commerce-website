'use client';

import { createContext, useReducer } from 'react';

export const Store = createContext();

// Check if we are in a browser environment before accessing localStorage
const isBrowser = typeof window !== 'undefined';

const initialState = {
  // Load cart from localStorage if it exists, otherwise create an empty cart
  cart: isBrowser && localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : { cartItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      
      // Save the updated cart to localStorage
      if (isBrowser) {
        localStorage.setItem('cart', JSON.stringify({ ...state.cart, cartItems }));
      }
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item.slug !== action.payload.slug
      );

      // Save the updated cart to localStorage
      if (isBrowser) {
        localStorage.setItem('cart', JSON.stringify({ ...state.cart, cartItems }));
      }
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'CART_CLEAR_ITEMS': {
      // Clear cart from localStorage as well
      if (isBrowser) {
        localStorage.removeItem('cart');
      }
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    }
      
    default:
      return state;
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{children}</Store.Provider>;
}