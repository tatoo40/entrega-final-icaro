import React, { useState,useEffect } from "react";
import { Card, Button } from "antd";

const ProductCard = ({ product, onAddToOrder }) => {

  const [isAdded, setIsAdded] = useState(false);
  const [isInLocalStorage, setIsInLocalStorage] = useState(false);


  const handleAddToOrder = () => {
    // Obtén el carrito actual de la sesión del usuario (si existe).
    const currentCart = JSON.parse(localStorage.getItem("cart")) || [];





    // Agrega el producto al carrito.
    currentCart.push({
      id: product.id,
      precio: product.precio,
      cantidad:1
    });

    // Actualiza el carrito en la sesión del usuario.
    localStorage.setItem("cart", JSON.stringify(currentCart));

    // Llama a la función proporcionada para actualizar el estado del carrito en tu componente principal.
    //onAddToOrder(product);

    // Actualiza el estado local para mostrar que el producto se ha agregado al carrito.
    setIsInLocalStorage(true);
    setIsAdded(true);
  };
  useEffect(() => {
    // Comprobar si el producto ya está en el localStorage al cargar el componente
    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductInCart = cartFromLocalStorage.some(
      (item) => item.id === product.id
    );
    setIsInLocalStorage(isProductInCart);
  }, [product.id]);
  





  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={product.nombre} src={`/src/assets/${product.foto}`}/>}
    >
      <Card.Meta title={product.nombre} description={product.descripcion} />
      <p>Price: ${product.precio}</p>
      {!isInLocalStorage ? (
        <Button type="primary" onClick={handleAddToOrder}>
          Agregar a la orden
        </Button>
      ) : (
        <Button type="primary" disabled={true} onClick={handleAddToOrder}>
        Agregado a la orden
      </Button>
      
      )}
    </Card>
  );
};

export default ProductCard;
