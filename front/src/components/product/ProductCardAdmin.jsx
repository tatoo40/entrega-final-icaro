import React, { useState,useEffect } from "react";
import { Card, Button } from "antd";
import { useNavigate } from "react-router-dom";

const ProductCardAdmin = ({ product, onAddToOrder }) => {

  const [isAdded, setIsAdded] = useState(false);
  const [isInLocalStorage, setIsInLocalStorage] = useState(false);

  const history = useNavigate();


  const handleUpdateClick = () => {
    // Redirige a la página de actualización de productos
    // Puedes ajustar la URL a donde quieras que vaya
    history(`/actualizaproducto/${product.id}`);

  };

  //const history = useHistory(); // Obtiene el objeto history

  const handleDeleteClick = async (productId) => {
    try {
      const response = await fetch(`http://localhost:4000/api/productos/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al borrar el producto");
      }

      // Realiza una nueva solicitud para actualizar la lista de productos
      window.location.href = "/productos"; 

      // Opcional: Puedes mostrar un mensaje de éxito o redirigir a otra página
      //history.push("/productos"); // Redirige a la página de productos actualizada
    } catch (error) {
      console.error(error);
    }
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

 

            <Button type="primary" onClick={() => handleUpdateClick(product.id)}>
              Actualizar Producto
            </Button>
            <Button type="primary" onClick={() => handleDeleteClick(product.id)}>
              Borrar Producto
            </Button>
       



    </Card>
  );
};

export default ProductCardAdmin;
