import React, { useState, useContext,useEffect } from "react";
import { Row, Col, Result, Button } from "antd";
import { AuthContext } from "../components/AuthContext";
import { CarritoContext } from "../components/CarritoContext";




function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = fecha.getDate().toString().padStart(2, "0");
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const año = fecha.getFullYear();
  return `${dia}/${mes}/${año}`;
}

const OrderSuccess = () => {
  const { isLogged, user, handleLogout } = useContext(AuthContext);
  const { addItemToCart, getCartItems, cartItems } = useContext(CarritoContext);

  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const orderDataFromLocalStorage = JSON.parse(localStorage.getItem("cabezalOrden"));
    setOrderData(orderDataFromLocalStorage);
  }, []);

  return (
    <>
    
      { orderData && 
   <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <Result
        status="success"
        title="¡Pedido realizado con éxito!"
        subTitle={`Resumen de la Orden: #${orderData.id}`}
        extra={[

          <p key="nombre">
            Estimado, <strong>{user.nombre}</strong>
          </p>,
          <p key="date">
            Fecha: <strong>{formatearFecha(orderData.fecha)}</strong>
          </p>,
          <p key="quantity">
            Cantidad de productos: <strong>{orderData.cantidad_productos}</strong>
          </p>,
          <p key="total">
            Precio total: <strong>${orderData.precio_total}</strong>
          </p>,
          <p key="comments">
            Comentarios: <strong>{orderData.comentarios}</strong>
          </p>,
                    <p key="metodo_entrega">
                    Metodo de entrega: <strong>{orderData.metodo_entrega}</strong>
                  </p>,
        ]}
        
      />
        {orderData.metodo_entrega === 'domicilio' && (
    <p key="domicilio">
      Dirección de Domicilio: <strong>{user.domicilio}</strong>
    </p>
  )}
  <h2>Productos Comprados:</h2>
  <ul>
    {cartItems.map((producto) => (
      <li key={producto.id}>
        {producto.nombre} - Cantidad: {producto.cantidad} - Precio Unitario: ${producto.precio}
      </li>
    ))}
  </ul>
      <Button type="primary" size="large" href="/">
        Volver a Inicio
      </Button>
      <br></br>
      <br></br>
    </div>
    }

    </>
  );
};
//localStorage.removeItem("cart");
//localStorage.removeItem("cabezalOrden");
export default OrderSuccess;
