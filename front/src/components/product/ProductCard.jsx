import React, { useState,useEffect, useContext } from "react";
import { Card, Button ,Tooltip} from "antd";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import { AuthContext } from "../AuthContext";
import ComentariosModal from './ComentariosModal';
import { CarritoContext } from "../CarritoContext";

const ProductCard = ({ product }) => {

  const { addItemToCart,cartItems } = useContext(CarritoContext); 
  const { isLogged, user, handleLogout } = useContext(AuthContext); // Importa handleLogout desde AuthContext

  const [comentarios, setComentarios] = useState([]); // Estado para almacenar comentarios
  const [modalVisible, setModalVisible] = useState(false);

  const [isAdded, setIsAdded] = useState(false);
  const [isInLocalStorage, setIsInLocalStorage] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false); 
// Obtener el objeto de estado almacenado en sessionStorage

  const handleAddToOrder = () => {

    // Agrega el producto al carrito.
    addItemToCart({
      id: product.id,
      nombre:product.nombre,
      precio: product.precio,
      cantidad: 1,
      foto:product.foto
    });

   setIsInLocalStorage(true);

 
  };
  useEffect(() => {
    // Comprobar si el producto ya está en el localStorage al cargar el componente
    const cartFromLocalStorage = cartItems || [];
    //const cartFromLocalStorage =  [];
    const isProductInCart = cartFromLocalStorage.some(
      (item) => item.id === product.id
    );
    setIsInLocalStorage(isProductInCart);
  }, [product.id]);


  
  const handleToggleFavorite = async (productId) => {

    if (!productId) {
      return; // Salir de la función si id o productId son undefined
    }
    // Cambia el estado de favorito cuando se hace clic en el botón
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    let idFavorito = 0;
  // Verifica si el producto ya está en la lista de favoritos del usuario actual
    const isProductInFavorites = favoritos.some((favorito) => {
      const cumpleCondicion = favorito.idUsuario === user.id && favorito.idProducto === productId;
      
      if (cumpleCondicion) {
        // Si cumple la condición, asigna el valor de favorito.id a idFavorito
        idFavorito = favorito.id;
      }
    
      return cumpleCondicion;
    });


    if (isProductInFavorites) {
      // Si el producto ya está en favoritos, puedes eliminarlo de la lista
      const updatedFavorites = favoritos.filter(
        (favorito) => !(favorito.idUsuario === user.id && favorito.idProducto === productId)
      );
      localStorage.setItem("favoritos", JSON.stringify(updatedFavorites));


      const response = await fetch(`http://localhost:4000/api/favoritos/${idFavorito}`, {

        method: "DELETE"

      });
  
      if (!response.ok) {
        //setLoading(false);
        //return setError(true);
        console.log("Error de favoritos")
      }
  
  
      setIsFavorite(false);



    } else {
      // Si el producto no está en favoritos, agrégalo a la lista
      const newFavorite = {
        idUsuario: user.id,
        idProducto: productId,
      };



      const response = await fetch(`http://localhost:4000/api/favoritos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFavorite),
      });
  
      if (!response.ok) {
        //setLoading(false);
        return setError(true);
      }
  
      const data = await response.json();
  
      const newFavoriteArray = {
        id:data.id,
        idUsuario: user.id,
        idProducto: productId,
      };
      favoritos.push(newFavoriteArray);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));

      setIsFavorite(true);

    }

  };
 
  
   const isProductFavorite = (productId) => {
    // Obtener la lista de favoritos del localStorage
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  
    // Verificar si el producto con productId está en la lista de favoritos del usuario actual
    return favoritos.some((favorito) => {
      return favorito.idUsuario === user.id && favorito.idProducto === productId;
    });
  };


  const handleGuardarComentario = (nuevoComentario) => {
    // Agrega el nuevo comentario al estado de comentarios
    setComentarios([...comentarios, nuevoComentario]);
  };

  const  calcularNotaPromedio =  (idProducto) => {
    // Filtra los comentarios relacionados con el producto específico
    //console.log(comentarios)

    fetch(`http://localhost:4000/api/notas/${idProducto}}`, {
      method: 'GET',
      // Puedes agregar cualquier configuración adicional de encabezados, autenticación, etc. aquí
    })
      .then((response) => response.json())
      .then((data) => {
        const sumaNotas = data.reduce((total, comentario) => total + comentario.nota, 0);
        //return (sumaNotas / data.length).toFixed(2); // Redondea a 2 decimales
        const notaPromedio = (sumaNotas / data.length).toFixed(2); // Redondea a 2 decimales
        return(notaPromedio);


      })
      .catch((error) => {
        console.error('Error al obtener comentarios:', error);
      });

  };










  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={product.nombre} src={`/src/assets/${product.foto}`}/>}
    >
      <Card.Meta title={product.nombre} description={product.descripcion} />
      {product.tiene_descuento ? (
        
        <>
          <p style={{ textDecoration: "line-through" }}>Precio: ${product.precio}</p>
          <p>Precio con descuento: ${product.precio_descuento}</p>
        </>
      ) : (
        <p>Precio: ${product.precio}</p>
      
      )}
      <small>Stock: {product.stock_actual} Un.</small> 
      <p>Nota Promedio: {calcularNotaPromedio(product.id)}</p>
        {isLogged &&

        <Tooltip title={isProductFavorite(product.id)  || isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}>
          <Button
            type="text"
            icon={isProductFavorite(product.id)  || isFavorite  ? <HeartFilled style={{ color: "red" }} /> : <HeartOutlined />}
            onClick={() => handleToggleFavorite(product.id)}
          />
        </Tooltip>
        }
    

    
      
         {/* Agrega un enlace o botón para abrir el modal de comentarios */}
      <Button onClick={() => setModalVisible(true)}>Ver Comentarios</Button>

      {/* Abre el modal para ver y agregar comentarios */}
      <ComentariosModal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onGuardarComentario={handleGuardarComentario}  productId={product.id} 
      />





      
{user?.role !== 'admin' && (
  !isInLocalStorage ? (
    <Button type="primary" onClick={handleAddToOrder}>
      Agregar a la orden
    </Button>
  ) : (
    <Button type="primary" disabled={true} onClick={handleAddToOrder}>
      Agregado a la orden
    </Button>
  )
)}

    </Card>
  );
};

export default ProductCard;
