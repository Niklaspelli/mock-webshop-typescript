import { useEffect, useState, type ReactNode } from "react";
import { ShopContext } from "./ShopContext";

export const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Record<number, number>>(() => {
    const localData = localStorage.getItem("bortakvall_cart");
    return localData ? JSON.parse(localData) : {};
  });

  useEffect(() => {
    localStorage.setItem("bortakvall_cart", JSON.stringify(cartItems));
  }, [cartItems]);
  const clearCart = () => {
    setCartItems({});
  };

  const addToCart = (itemId: number) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + 1),
    }));
  };

  const removeFromCart = (itemId: number) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) - 1),
    }));
  };

  const updateCartItemCount = (newAmount: number, itemId: number) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: newAmount,
    }));
  };

  return (
    <ShopContext.Provider
      value={{
        addToCart,
        cartItems,
        removeFromCart,
        updateCartItemCount,
        clearCart,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
