import React, { useState } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const RegistroForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  // Define el estado inicial del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    direccion: "",
    telefono: "",
    password: "",
  });

  const onFinish = async (values) => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("http://localhost:4000/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        setLoading(false);
        return setError(true);
      }

      const data = await response.json();
      navigate("/login"); // Redirige a la página de inicio de sesión después del registro exitoso
    } catch (error) {
      console.log({ error });
      setError(true);
    }

    setLoading(false);
  };

  const handleInputChange = (e) => {
    // Actualiza el estado del formulario cuando se cambian los valores
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col span={8}>
          <Form
            name="registro_form"
            className="registro-form"
            onFinish={onFinish}
          >
            <Form.Item
              name="nombre"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu Nombre",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu email",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              name="direccion"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu direccion",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              name="telefono"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu telefono",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa tu contraseña",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Contraseña"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </Form.Item>

            {error && (
              <Form.Item>
                <p style={{ color: "red" }}>
                  Error al registrar el usuario. Por favor intente de nuevo.
                </p>
              </Form.Item>
            )}

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="registro-form-button"
                loading={loading}
              >
                Registrarse
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default RegistroForm;
