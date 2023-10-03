import React, { useState,useEffect } from "react";
import { Form, Input, Button, Row, Col, Select, Upload, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate,useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
///import usuario from "../../../backend/models/usuario";

const ActualizarProductoForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [categories, setCategories] = useState([]); // Estado para almacenar las categorías
  const navigate = useNavigate();
  const { id } = useParams(); // Obtiene el ID del producto de la URL

  const [producto, setProducto] = useState();

  // Define el estado inicial del formulario
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    precio: 0,
    stock_actual: 0,
    categoria_id: 0,
    foto:'sinimagen.png'
  });



  const onFinish = async (values) => {
    setLoading(true);
    setError(false);

    try {
      // Crear un objeto FormData para enviar la foto al servidor
      //const formData = new FormData();

      console.log(id)
      console.log(values)
    
        const response = await fetch(`http://localhost:4000/api/productos/${id}`, {
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
      navigate("/productos"); // Redirige a la página de inicio de sesión después del registro exitoso
    } catch (error) {
      console.log({ error });
      setError(true);
    }

    setLoading(false);
  };

  const fetchProductDetails = async (id) => {

    //console.log(id);
    try {
      const response = await fetch(`http://localhost:4000/api/productos/${id}`);
      if (!response.ok) {
        throw new Error("Error al obtener los detalles del producto");
      }
      const data = await response.json();

      setProducto(...data)
      // Llena el estado del formulario con los detalles del producto
      console.log(data[0]);
      //setFormData
      setFormData({ ...data[0] })


      console.log(formData)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Llama a la función para cargar los detalles del producto al cargar el componente
 
    fetchProductDetails(id);
  }, [id]); 

  // Configuración de la subida de archivos de Ant Design
  const uploadProps = {
    name: "foto",
    maxCount: 1,
    beforeUpload: (file) => {
      // Realiza la validación de la extensión de la foto aquí si es necesario
      return true;
    },
    onChange: (info) => {
      if (info.file.status === "done") {
        message.success(`${info.file.name} se subió correctamente`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} subida fallida.`);
      }
    },
  };





  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/categorias");
        if (!response.ok) {
          throw new Error("Error al obtener las categorías");
        }
        const data = await response.json();
        setCategories(data); // Almacena las categorías en el estado
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories(); // Llama a la función para obtener las categorías
  }, []);

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
        { producto &&
          <Form
            name="registro_form"
            className="registro-form"
            onFinish={onFinish}
            initialValues={{ nombre: producto.nombre, descripcion:producto.descripcion, 
              precio:producto.precio, 
              stock_actual:producto.stock_actual,
              categoria_id:producto.categoria_id, foto:producto.foto}} 
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
                value={producto.nombre}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item
              name="descripcion"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa la descripcion",
                },
              ]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Descripcion"
                name="descripcion"
                value={producto.descripcion}
                onChange={handleInputChange}
              />
            </Form.Item>
            <Form.Item
              name="precio"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el precio",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Precio"
                name="precio"
                value={producto.precio}
                onChange={handleInputChange}
              />
            </Form.Item>

            <Form.Item
              name="categoria_id"
              rules={[
                {
                  required: true,
                  message: "Por favor selecciona la categoría",
                },
              ]}
            >
              <Select
                placeholder="Seleccionar categoría"
                value={producto.categoria_id} 
                onChange={(value) => setFormData({ ...formData, categoria_id: value })}
              >
                {categories.map((category) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.nombre}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="stock_actual"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el stock actual",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}

                placeholder="Stock actual"
                name="stock_actual"
                value={producto.stock_actual}
                onChange={handleInputChange}
              />
            </Form.Item>



            <Form.Item
              name="foto"
              rules={[
                {
                  required: true,
                  message: "Por favor ingresa el stock actual",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}

                placeholder="Foto"
                name="foto"
                value={producto.foto}
                onChange={handleInputChange}
              />
            </Form.Item>
            {error && (
              <Form.Item>
                <p style={{ color: "red" }}>
                  Error al registrar el producto. Por favor intente de nuevo.
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
                ACTUALIZAR
              </Button>
            </Form.Item>
          </Form>
}
        </Col>
      </Row>
      <Footer />
    </>
  );
};

export default ActualizarProductoForm;
