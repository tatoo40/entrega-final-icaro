import React, { createContext, useState, useContext, useEffect } from 'react';

const CarritoContext = createContext();

function CarritoProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // Estado para almacenar los elementos del carrito

  // Función para agregar un elemento al carrito
  const addItemToCart = (item) => {
    // Verifica si el producto ya está en el carrito
    const productoEnCarrito = cartItems.find((producto) => producto.id === item.id);
  
    if (productoEnCarrito) {
      // Si el producto ya está en el carrito, puedes mostrar un mensaje de error o realizar una acción específica.
      console.error('El producto ya está en el carrito.');
    } else {
      // Si el producto no está en el carrito, agrégalo.
      const updatedCart = [...cartItems, item];
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Guarda el carrito en el localStorage
    }
  };
  

  // Función para eliminar un elemento del carrito
  const removeItemFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Actualiza el carrito en el localStorage

    return updatedCart;
  };

  const removeAllItems = () => {
    const updatedCart = []; // Una matriz vacía para eliminar todos los elementos
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart)); // Actualiza el carrito en el localStorage
  
    return updatedCart;
  };

  // Función para obtener la cantidad de elementos en el carrito
  const getCartItemCount = () => {
 
    return cartItems ? cartItems.length : 0;
  };


  const getCartItems = () => {
    return cartItems;
  };

  // Carga el carrito desde el localStorage cuando se inicia la aplicación
  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    //console.log( localStorage.getItem('cart'));
    if (cartData) {
      //console.log(cartData);
      setCartItems(JSON.parse(cartData));
    }
  }, []);

  // Puedes definir otras funciones según tus necesidades, como vaciar el carrito, calcular el total, etc.

  return (
    <CarritoContext.Provider value={{getCartItems, cartItems, addItemToCart, removeItemFromCart, getCartItemCount,removeAllItems }}>
      {children}
    </CarritoContext.Provider>
  );
}

// Hook personalizado para acceder al contexto del carrito
function useCarrito() {
  const context = useContext(CarritoContext);
  if (context === undefined) {
    throw new Error('useCarrito debe usarse dentro de un CarritoProvider');
  }
  return context;
}

export { CarritoProvider, useCarrito ,CarritoContext};
