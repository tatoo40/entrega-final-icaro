import React, { useState, useEffect,useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { CarritoContext } from "../components/CarritoContext";

const OfertasCarousel = () => {



  const [ofertas, setOfertas] = useState([]);
  const fechaActual = new Date().toISOString().slice(0, 10); // Obtiene la fecha actual en formato 'yyyy-mm-dd'
  const { addItemToCart,cartItems } = useContext(CarritoContext); 

  useEffect(() => {
    // Realizar una solicitud a la API para obtener las ofertas
    fetch('http://localhost:4000/api/ofertas')
      .then((response) => response.json())
      .then((data) => {

        //console.log(data)
        //console.log(fechaActual)
        // Filtra las ofertas cuya fecha_hasta es mayor o igual a la fecha actual
        const ofertasFiltradas = data.filter((oferta) => oferta.fecha_hasta >= fechaActual);
        setOfertas(ofertasFiltradas);
      })
      .catch((error) => {
        console.error('Error al obtener ofertas:', error);
      });
  }, []);

  const agregarAlCarrito = (oferta) => {
    // Realiza una solicitud para obtener la información del producto
    fetch(`http://localhost:4000/api/productos/${oferta.idProducto}`)
      .then((response) => response.json())
      .then((producto) => {

        if (producto[0].id && producto[0].precio && producto[0].foto) {
          const item = {
            id: producto[0].id,
            nombre:producto[0].nombre,
            precio: producto[0].precio,
            cantidad: 1,
            foto: producto[0].foto,
          };
    
          // Ahora puedes pasar 'item' a 'addItemToCart'
          addItemToCart(item);

        } else {
          console.error('La respuesta de la API no contiene los datos necesarios.');
        }
       
      })
      .catch((error) => {
        console.error('Error al obtener la información del producto:', error);
      });
  };
  
  return (
    <Carousel>
    {ofertas.map((oferta) => (
      <div key={oferta.idProducto}>
        <img src={`/src/assets/${oferta.foto}`}  alt={oferta.descripcion} />
        <p className="legend">{oferta.descripcion}</p>
        <button onClick={() => agregarAlCarrito(oferta)}>Agregar al carrito</button>
      </div>
    ))}
  </Carousel>


 



  );
};

export default OfertasCarousel;



