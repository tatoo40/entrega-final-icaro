import React, { useState,useEffect } from "react";
import { Form, Input, Button, Checkbox, Row, Col } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import useUserLogin from "../store/useUserLogin";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const PerfilForm = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { user, setUser } = useUserLogin();
    const [usuario,setUsuario] = useState();
    const navigate = useNavigate();
    //const { user } = useUserLogin();
  

  
    // Carga los datos del usuario en el formulario cuando se monta el componente
    useEffect(() => {
        console.log(user)
      //setUsuario(...user);

      //console.log(usuario.nombre)

      if (user) {
        console.log(user.nombre)
        // Si el usuario está autenticado, establece sus datos en el estado del formulario
   

      }
    }, [user]);

    const onFinish = async (values) => {
        setLoading(true);
        setError(false);
    
        try {
          const response = await fetch(`http://localhost:4000/api/usuarios/${user.id}`, {
            method: "PUT",
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
          setUser(data);
          navigate("/perfil");
        } catch (error) {
          console.log({ error });
          setError(true);
        }
    
        setLoading(false);
      };
    
      const handleInputChange = (e) => {

      };

  return (

   <>
    <Navbar

     /><Row justify="center" align="middle" style={{ height: "100vh" }}>
          <Col span={8}>
            { user && 
              <Form
                  name="normal_login"
                  className="login-form"
                  initialValues={{ nombre: user.nombre, email:user.email, domicilio:user.domicilio, telefono:user.telefono, password:user.password }}
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
                          value={user.nombre}
                          onChange={handleInputChange} />
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
                          prefix={<UserOutlined className="site-form-item-icon" />}
                          placeholder="Email"
                          name="email"
                          value={user.email}
                          onChange={handleInputChange} />
                  </Form.Item>
                  <Form.Item
                      name="domicilio"
                      rules={[
                          {
                              required: true,
                              message: "Por favor ingresa tu domicilio",
                          },
                      ]}
                  >
                      <Input
                          prefix={<UserOutlined className="site-form-item-icon" />}
                          placeholder="Domicilio"
                          name="domicilio"
                          value={user.domicilio}
                          onChange={handleInputChange} />
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
                          value={user.telefono}
                          onChange={handleInputChange} />
                  </Form.Item>
                  <Form.Item
                      name="password"
                      rules={[
                          { required: true, message: "Por favor ingresa tu contraseña!" },
                      ]}
                  >
                      <Input
                          prefix={<UserOutlined className="site-form-item-icon" />}
                          placeholder="Password"
                          name="password"
                          type="password"
                          value={user.password}
                          onChange={handleInputChange} />
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
                          Guardar Cambios
                      </Button>
                  </Form.Item>
              </Form>
}
          </Col>
      </Row><Footer /></>
  );
};

export default PerfilForm;
