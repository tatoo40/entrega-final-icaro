import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Define el estado inicial del formulario
  const [formData, setFormData] = useState({
    comentarios: "",
  });

  const onFinish = async (values) => {
    setLoading(true);
    setError(false);

    try {
      // Obtén los productos del carrito desde localStorage
      const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

      // Crea una nueva orden con los productos del carrito y los comentarios
      const order = {
        productos: cartItems,
        comentarios: values.comentarios,
      };

      const response = await fetch("http://localhost:4000/api/productos_x_orden", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        setLoading(false);
        return setError(true);
      }

      // Limpia el carrito después de completar la orden
      localStorage.removeItem("cart");

      navigate("/order-success"); // Redirige a la página de éxito después de realizar el pedido
    } catch (error) {
      console.log({ error });
      setError(true);
    }

    setLoading(false);
  };

  return (
    <>
    <Navbar

     />
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={8}>
        <Form name="checkout_form" onFinish={onFinish}>
          <Form.Item
            name="comentarios"
            label="Comentarios"
          >
            <Input.TextArea
              placeholder="Agrega tus comentarios"
              name="comentarios"
              value={formData.comentarios}
              onChange={(e) => setFormData({ comentarios: e.target.value })}
            />
          </Form.Item>

          {error && (
            <Form.Item>
              <p style={{ color: "red" }}>
                Error al realizar el pedido. Por favor intente de nuevo.
              </p>
            </Form.Item>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
            >
              Realizar Pedido
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
    <Footer /></>
  );
};

export default CheckoutForm;
