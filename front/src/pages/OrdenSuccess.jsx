import React, { useState, useContext,useEffect } from "react";
import { Row, Col, Result, Button } from "antd";
import { AuthContext } from "../components/AuthContext";
//import { CarritoContext } from "../components/CarritoContext";




function formatearFecha(fechaISO) {
  const fecha = new Date(fechaISO);
  const dia = fecha.getDate().toString().padStart(2, "0");
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const año = fecha.getFullYear();
  return `${dia}/${mes}/${año}`;
}

const OrderSuccess = () => {
  const { isLogged, user, handleLogout } = useContext(AuthContext); // Importa handleLogout desde AuthContext
  //const { addItemToCart,getCartItems } = useContext(CarritoContext); 

  console.log(JSON.parse(localStorage.getItem("cabezalOrden")));
  const [orderData, setOrderData] = useState();

  useEffect(() => {
    // Obtener los datos de cabezalOrden del localStorage
    const orderDataFromLocalStorage = JSON.parse(localStorage.getItem("cabezalOrden"));
    setOrderData(orderDataFromLocalStorage);

    // Eliminar los elementos del carrito y el cabezal de la orden después de mostrar los detalles

  }, [orderData]);


  console.log(orderData)

  return (
    <>
    
      { orderData && 
   <div style={{ textAlign: "center", paddingTop: "50px" }}>
      <Result
        status="success"
        title="¡Pedido realizado con éxito!"
        subTitle={`Resumen de la Orden: #${orderData.id}`}
        extra={[

          <p key="comments">
            Estimado: <strong>{user.nombre}</strong>
          </p>,
          <p key="comments">
          La orden se enviara al domicilio: <strong>{user.domicilio}</strong>
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
        ]}
      />

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
localStorage.removeItem("cart");
localStorage.removeItem("cabezalOrden");
export default OrderSuccess;
