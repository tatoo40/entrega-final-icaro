import React, { useState, useEffect, useContext } from 'react';
import { Modal, Select, Input, Button, Form, List, Typography } from 'antd';
import { AuthContext } from '../AuthContext'; // Asegúrate de importar tu contexto de autenticación



const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;



const ComentariosModal = ({ visible, onCancel, onGuardarComentario, productId }) => {

  const { user } = useContext(AuthContext); // Obtener el usuario desde el contexto de autenticación

  const [form] = Form.useForm();
  const [nota, setNota] = useState(1);
  const [comentarios, setComentarios] = useState([]); // Estado para almacenar comentarios

  const handleNotaChange = (value) => {
    setNota(value);
  };

  const handleGuardarComentario = () => {
    form.validateFields().then((values) => {
      const comentarioData = {
        fecha: new Date().toISOString(), // Obtener la fecha actual en formato ISO
        comentario: values.comentario,
        idUsuario: user.id, // Suponiendo que ya tienes el ID del usuario en el contexto
        nota,
        idProducto: productId, // Suponiendo que ya tienes el ID del producto disponible
      };
  
      // Realizar la solicitud POST a la API
      fetch('http://localhost:4000/api/comentarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comentarioData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al enviar el comentario');
          }
          return response.json();
        })
        .then((data) => {
          // Actualizar la lista de comentarios después de que se guarda el nuevo comentario
          setComentarios([...comentarios, comentarioData]);
          // Restablecer el formulario
          form.resetFields();
        })
        .catch((error) => {
          console.error('Error al enviar el comentario:', error);
        });
    });
  };

  useEffect(() => {
    // Realiza una solicitud GET a la API para obtener los comentarios
    fetch(`http://localhost:4000/api/comentarios/prod/${productId}`, {
      method: 'GET',
      // Puedes agregar cualquier configuración adicional de encabezados, autenticación, etc. aquí
    })
      .then((response) => response.json())
      .then((data) => {
        // Ordena los comentarios por fecha en orden descendente (más recientes primero)
        const sortedComentarios = data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        setComentarios(sortedComentarios);
      })
      .catch((error) => {
        console.error('Error al obtener comentarios:', error);
      });
  }, [visible]);



  const isUserLoggedIn = !!user; // Comprueba si el usuario está logueado

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Modal
      visible={visible}
      title="Agregar Comentario"
      onCancel={onCancel}
      footer={[
        <Button key="cancelar" onClick={onCancel}>
          Cancelar
        </Button>,
        <Button key="guardar" type="primary" onClick={handleGuardarComentario}>
          Guardar
        </Button>,
      ]}
    >
      <Form form={form}>
        <Form.Item
          name="comentario"
          label="Comentario"
          rules={[{ required: true, message: 'Por favor ingresa tu comentario.' }]}
        >
          <TextArea rows={4} placeholder="Escribe tu comentario aquí" disabled={!isUserLoggedIn} />
        </Form.Item>
        <Form.Item label="Nota">
          <Select value={nota} onChange={handleNotaChange}>
            {[1, 2, 3, 4, 5].map((value) => (
              <Option key={value} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>

      {/* Sección para mostrar los comentarios */}
      <List
  header={<Text strong>Comentarios existentes</Text>}
  bordered
  dataSource={comentarios}
  renderItem={(item) => (
    <List.Item>
      <Text strong>Fecha: {formatDate(item.fecha)}</Text>
      <br />
      <Text>Comentario: {item.comentario}</Text>
      <br />
      <Text>Nota: {item.nota}</Text> {/* Muestra la nota */}
    </List.Item>
  )}
/>
    </Modal>
  );
};

export default ComentariosModal;
