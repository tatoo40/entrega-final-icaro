import React, { useEffect, useState ,useContext} from "react";
import ProductGridAdmin from "../components/product/ProductGridAdmin";
import { AuthContext } from "../components/AuthContext";
import { Input, Select, Row, Col, Typography , Button} from "antd";
import { useNavigate } from "react-router-dom";


const Productos = () => {
  const { Title } = Typography; 
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // Para almacenar las categorías


  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" o "desc"
  const [selectedCategory, setSelectedCategory] = useState(null);


  const navigate = useNavigate();

  const { isLogged, user, handleLogout } = useContext(AuthContext); 


  const fetchTodos = async () => {
    const response = await fetch("http://localhost:4000/api/productos");
    const data = await response.json();

    setProducts(data);
    setFilteredProducts(data);
  };


  // Función para obtener las categorías desde el backend
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

  useEffect(() => {
    fetchCategories(); // Llama a la función para obtener las categorías
  }, []);

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    // Filtros por nombre
    const filteredByName = products.filter((product) =>
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    // Filtros por precio máximo
    const filteredByMaxPrice = maxPrice
      ? filteredByName.filter((product) => product.precio <= maxPrice)
      : filteredByName;

    // Filtros por precio mínimo
    const filteredByMinPrice = minPrice
      ? filteredByMaxPrice.filter((product) => product.precio >= minPrice)
      : filteredByMaxPrice;

    // Filtros por categoría
    const filteredByCategory = selectedCategory
      ? filteredByMinPrice.filter(
          (product) => product.categoria_id === selectedCategory
        )
      : filteredByMinPrice;

    // Ordenar por precio
    const sortedProducts = filteredByCategory.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.precio - b.precio;
      } else {
        return b.precio - a.precio;
      }
    });

    setFilteredProducts(sortedProducts);
  }, [searchTerm, maxPrice, minPrice, selectedCategory, sortOrder, products]);



  return (
    <>
   { user.role==='admin' && 
    <div style={{ textAlign: "left" ,  margin:"25px"  }}>



      <Title level={3} style={{ textAlign: "center" }}>
              Edicion de productos
            </Title>




        
      <Row justify="center" align="middle">
        <Col span={8}>

        <h3 style={{ textAlign: "left" ,  margin:"0px 0px 2px 0px"}}>Filtrar por nombre del producto</h3>
          <Input
            type="text"
            placeholder="Nombre del producto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
      </Row>


      <Row justify="center" align="middle">
        <Col span={8}>
        <h3 style={{ textAlign: "left" ,  margin:"20px 0px 2px 0px"}}>Seleccionar categoría de productos</h3>
          <Select
            placeholder="Selecciona una categoría"
            onChange={(value) => setSelectedCategory(value)}
            allowClear
          >
            {categories.map((category) => (
              <Select.Option key={category.id} value={category.id}>
                {category.nombre}
              </Select.Option>
            ))}
          </Select>
        </Col>
      </Row>


      <Row justify="center" align="middle">
        <Col span={8}>
        <h3 style={{ textAlign: "left" ,  margin:"20px 0px 2px 0px"}}>Filtrar por precio</h3>
          <Input
            type="number"
            placeholder="Precio mínimo"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
          />
        </Col>
      </Row>


      <Row justify="center" align="middle">
        <Col span={8}>
        <h3 style={{ textAlign: "left" ,  margin:"20px 0px 2px 0px"}}>Filtrar por precio</h3>

          <Input
            type="number"
            placeholder="Precio máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </Col>
      </Row>

 
      <Row justify="center" align="middle">
        <Col span={8}>
          <h3 style={{ textAlign: "left" ,  margin:"20px 0px 2px 0px"}}>Ordenar por precio</h3>
          <Select
            placeholder="Ordenar por precio"
            defaultValue="asc"
            onChange={(value) => setSortOrder(value)}
          >
            <Select.Option value="asc">Precio ascendente</Select.Option>
            <Select.Option value="desc">Precio descendente</Select.Option>
          </Select>
        </Col>
      </Row>
    
      <Row justify="center" align="middle">
        <Col span={8}>
          
        <Button
                type="primary"
                htmlType="submit"
                className="registro-form-button"
                onClick={() => navigate("/agregarproducto")}
              >
               AGREGAR PRODUCTO
              </Button>
  
        </Col>
      </Row>
    



      </div>

      }
      <div style={{ textAlign: "center" }}>

      { user.role==='admin' && 
      <Row gutter={[16, 16]}>
        <Col span={24}>
          {filteredProducts ? <ProductGridAdmin products={filteredProducts} /> : null}
        </Col>
      </Row>
          } 
          
          
          { user.role!=='admin' && 
            <Row justify="center" align="middle" style={{ height: "100vh" }}>
            <Col span={8}>
              <p>Usted no puede ver los productos en esta seccion si no es administrador</p>
              <br></br>
     
            </Col>
          </Row>
          }
    </div>

  </>
  );
};

export default Productos;
