import React, { useState,useEffect } from "react";
import { Card, Button, Modal } from "antd";
import { useNavigate } from "react-router-dom";

const ProductCardAdmin = ({ product, onAddToOrder }) => {

  const [isAdded, setIsAdded] = useState(false);
  const [isInLocalStorage, setIsInLocalStorage] = useState(false);

  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); 




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
      setIsSuccessModalVisible(true); // Ocultar el modal de éxito
      history("/productos")
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
  
  const handleModalOk = () => {
    setIsSuccessModalVisible(false); // Ocultar el modal de éxito
    history("/productos"); // Redirige a /login después de cerrar el modal
  };
  return (

    <>
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={product.nombre} src={`/src/assets/${product.foto}`}/>}
      key={product.id} 
    >
      <Card.Meta title={product.nombre} description={product.descripcion} />
      {product.tiene_descuento ? (
        <>
          <p style={{ textDecoration: "line-through" }}>Precio: ${product.precio}</p>
          <p>Precio con descuento: ${product.precio_descuento}</p>
        </>
      ) : (
        <p>Precio: ${product.precio}</p>
      )}

<small>Stock: {product.stock_actual} Un.</small> 

            <Button type="primary" onClick={() => handleUpdateClick(product.id)}>
              Actualizar Producto
            </Button>
            <br></br>
            <Button type="primary" onClick={() => handleDeleteClick(product.id)}>
              Borrar Producto
            </Button>
       



    </Card>
    

    <Modal
    title="Producto actualizado"
    visible={isSuccessModalVisible}
    onOk={handleModalOk}
    okText="Ir al listado"
  >
    <p>El producto se ha borrado correctamente.</p>
  </Modal>    </>


  );
};

export default ProductCardAdmin;
