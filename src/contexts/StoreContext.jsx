import { createContext, useContext, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, clearCart } from "../features/cartSlice";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const dispatch = useDispatch();

  // Access Redux data
  const { items: products } = useSelector((state) => state.products);
  const { items: cartItems } = useSelector((state) => state.cart);

  // Calculate derived data
  const getTotalQuantity = useMemo(() => {
    return cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
  }, [cartItems]);

  const getTotalCartAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      // If meal API has no price, assign default or derived logic
      const price = item.price || 150; // fallback price (can modify)
      return sum + price * (item.quantity || 1);
    }, 0);
  }, [cartItems]);

  // Handlers that bridge Redux actions
  const handleAddToCart = (product) => dispatch(addToCart(product));
  const handleRemoveFromCart = (id) => dispatch(removeFromCart(id));
  const handleClearCart = () => dispatch(clearCart());

  // Shared context value
  const contextValue = {
    products, // fetched from API
    cartItems,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    clearCart: handleClearCart,
    getTotalQuantity,
    getTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;

// custom hook for easier use
export const useStore = () => useContext(StoreContext);
