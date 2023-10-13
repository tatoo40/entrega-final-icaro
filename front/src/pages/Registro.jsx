import React, { useState } from "react";
import { Form, Input, Button, Row, Col, Typography,Modal } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";


const RegistroForm = () => {

  const { Title } = Typography; 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [successMsg, setSuccessMsg] = useState(); 
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); 
  const navigate = useNavigate();

  // Define el estado inicial del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    domicilio: "",
    telefono: "",
    password: "",
  });

  const onFinish = async (values) => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("http://localhost:4000/api/registro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });



      if (!response.ok) {

        setLoading(false);
       
        if (response.status===400){ 

          setErrorMsg('Ya existe un usuario con esa cuenta de correo')
        
        }else{

          setErrorMsg('Hubo un error en el registro de los datos ')

        }
        return setError(true);
        
      }

      const data = await response.json();
      setSuccessMsg('Usted se ha registrado correctamente');

      setIsSuccessModalVisible(true); 



    } catch (error) {
    
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


  const handleModalOk = () => {
    setIsSuccessModalVisible(false); // Ocultar el modal de éxito
    navigate("/login"); // Redirige a /login después de cerrar el modal
  };

  return (
    <>
   
     



      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <Col span={8}>
        
        <Title level={3} style={{ textAlign: "center" }}>
              Registro de usuarios
            </Title>




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
                value={formData.domicilio}
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
                  {errorMsg}
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

      <Modal
        title="Registro exitoso"
        visible={isSuccessModalVisible}
        onOk={handleModalOk}
        okText="Continuar a Inicio de Sesión"
      >
        <p>Usted se ha registrado correctamente.</p>
      </Modal>
    </>
  );
};

export default RegistroForm;
