import React, { useState,useEffect , useContext} from "react";
import { Form, Input, Button, Row, Col,Modal , Typography} from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { CarritoContext } from "../components/CarritoContext";

const PerfilForm = () => {

    const { Title } = Typography; 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); 
    const navigate = useNavigate();
    const [successMsg,setSuccessMsg] = useState();
    const { isLogged, user, handleLogout,updateUser } = useContext(AuthContext); // Importa handleLogout desde AuthContext
    const { addItemToCart,getCartItems } = useContext(CarritoContext); 

  
    // Carga los datos del usuario en el formulario cuando se monta el componente
    useEffect(() => {
  
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


          console.log(data)
          //console.log(user)
          
          //er(data[0]);

          //console.log(user)

          const newUserData = {
            ...data[0]
          };
      
          try {
            const updatedUserData = await updateUser(newUserData);

            setSuccessMsg('Datos modificados correctamente');
            setIsSuccessModalVisible(true); 
          
        } catch (error) {
        
            console.log({ error });
            setError(true);
            setSuccessMsg('"Error al actualizar los datos del usuario');
     
          }


          



        } catch (error) {

  
          console.log({ error });
          setError(true);

        }
    
        setLoading(false);
      };
    
      const handleInputChange = (e) => {

      };
      const handleModalOk = () => {
        setIsSuccessModalVisible(false); // Ocultar el modal de éxito
        navigate("/"); // Redirige a /login después de cerrar el modal
      };

  return (

   <>


     <Row justify="center" align="middle" style={{ height: "100vh" }}>
          <Col span={8}>

          <Title level={3} style={{ textAlign: "center" }}>
              Perfil de usuario
            </Title>
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
      </Row>
      
      <Modal
        title="Usuario modificado correctamente"
        visible={isSuccessModalVisible}
        onOk={handleModalOk}
        okText="Continuar al listado de productos"
      >
        <p>Sus datos se han guardad correctamente</p>

      </Modal> 
      </>
  );
};

export default PerfilForm;
