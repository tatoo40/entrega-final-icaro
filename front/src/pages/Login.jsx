import React, { useContext, useState } from "react";
import { AuthContext } from "../components/AuthContext"
import { Form, Input, Button, Checkbox, Row, Col, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate,Link } from "react-router-dom";

const LoginForm = () => {
  const { Title } = Typography; 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();


  const { login } = useContext(AuthContext); 
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });



  const onFinish = async (values) => {
 
    try {
      // Llama a la función de inicio de sesión con las credenciales ingresadas
      const user = await login(values.email, values.password)
 

      
    if (user) {
    
      navigate("/productos");
    } else {
    
      setError(true)
      console.error("Inicio de sesión fallido. Usuario no encontrado.");
    }  
     
    } catch (error) {
     
      console.error("Error de inicio de sesión:", error);
    }
  };

  return (
    <>

    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <Col span={8}>

      <Title level={3} style={{ textAlign: "center" }}>
              Ingreso de usuarios
            </Title>

        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
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
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: "Por favor ingresa tu contraseña!" },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Contraseña"
            />
          </Form.Item>

          {error && (
            <Form.Item>
              <p style={{ color: "red" }}>
                Usuario o contraseña incorrectos. Por favor intente de nuevo.
              </p>
            </Form.Item>
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Iniciar sesión
            </Button>
          </Form.Item>
        </Form>
        <p>
    ¿No tienes una cuenta?{" "}
    <Link to="/registro">Regístrate <b>AQUI</b></Link>
  </p>
      </Col>
    </Row>
    </>
  );
};

export default LoginForm;
