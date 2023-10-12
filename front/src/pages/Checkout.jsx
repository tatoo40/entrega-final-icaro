import React, { useState , useContext} from "react";
import { Form, Input, Button, Row, Col,Select } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../components/AuthContext";
import { CarritoContext } from "../components/CarritoContext";

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null); 

  
  const { isLogged, user, handleLogout } = useContext(AuthContext); // Importa handleLogout desde AuthContext
  const { addItemToCart,getCartItems } = useContext(CarritoContext); 

  const [formData, setFormData] = useState({
    comentarios: "",
  });

  const onFinish = async (values) => {
    setLoading(true);
    setError(false);

    try {
      // Obtén los productos del carrito desde localStorage
      const cartItems = getCartItems() || [];
 
      const totalAmount = cartItems.reduce((total, item) => {
        const itemTotal = item.cantidad * item.precio;
        return total + itemTotal;
      }, 0);
      
    

      // Crea una nueva orden con los productos del carrito y los comentarios
      const orderData = {
        fecha: new Date(), // Obtener la fecha actual
        idUsuario: user.id, // Sustituye con el ID del usuario
        cantidad_productos: JSON.parse(localStorage.getItem("cart"))?.length, // Sustituye con la cantidad total de productos
        precio_total: totalAmount, // Sustituye con el precio total
        comentarios: values.comentarios, // Sustituye con los comentarios
        metodo_entrega:values.metodo_entrega
      };
      
      

      const response = await fetch("http://localhost:4000/api/ordenes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });
      
      if (!response.ok) {
        // Manejar errores aquí
        console.error("Error al guardar el cabezal de la orden.");
        return;
      
      }else{

        const orderResponseData = await response.json();
        const orderId = orderResponseData.id;

        //setOrderData(orderData)
        orderData.id = orderId;
        localStorage.setItem("cabezalOrden", JSON.stringify(orderData));

        //console.log( localStorage.getItem("cabezalOrden"))

        cartItems.forEach(async (product) => {
         
        
          const productData = {
            idOrden: orderId, // Sustituye con el ID de la orden recién creada
            cantidad: product.cantidad, // Cantidad del producto
            precio: product.precio, // Precio unitario del producto
            id_producto: product.id, // ID del producto
          };
              try {
                const productResponse = await fetch("http://localhost:4000/api/productosxorden", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(productData),
                });
            
                if (!productResponse.ok) {
                  console.error("Error al guardar un producto en la orden.");
                  return;
                }
            
              } catch (error) {

                console.error("Error al enviar la solicitud API para actualizar el producto:", error);
              
              }
        
        })
  
        
          // Limpia el carrito después de completar la orden
          
          setOrderData(orderData);
          navigate("/orden-success"); // Redirige a la página de éxito después de realizar el pedido

      

      }




    } catch (error) {
      console.log({ error });
      setError(true);
    }

    setLoading(false);
  };

  return (
    <>

     { isLogged && 
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
          <Form.Item
            name="metodo_entrega"
            label="Método de entrega"
          >
            <Select>
              <Option value="domicilio">Envío a domicilio</Option>
              <Option value="local">Retirar en el local</Option>
            </Select>
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
}:{
     <Row justify="center" align="middle" style={{ height: "100vh" }}>
     <Col span={8}>
       <p>Tenemos un problema para procesar la orden usted tiene que esta logueado. Por favor ingrese a traves del siguiente link</p>
       <br></br>
       <b><Link to="/login">Iniciar Sesión</Link></b>
     </Col>
   </Row>
}
</>
  );
};

export default CheckoutForm;
