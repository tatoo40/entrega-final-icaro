import React, {useEffect, useState} from 'react';
export const ProductList = ({
	allProducts,
	setAllProducts,
	countProducts,
	setCountProducts,
	total,
	setTotal

	
}) => {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]); // Para almacenar las categorías

	const onAddProduct = product => {
		if (allProducts.find(item => item.id === product.id)) {
			const products = allProducts.map(item =>
				item.id === product.id
				? { ...item, cantidad: 1 + 1 }
					: item
			);
			setTotal(total + product.precio * 1);
			setCountProducts(countProducts + 1);
			return setAllProducts([...products]);
		}

		setTotal(total + product.precio * 1);
		setCountProducts(countProducts + 1);
		setAllProducts([...allProducts, product]);
	};

	const fetchTodos = async () => {
		const response = await fetch("http://localhost:4000/api/productos");
		const data = await response.json();
		
		console.log(data);
		
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

	return (
		<div className='container-items'>
			{products.map(product => (
				<div className='item' key={product.id}>
					<figure>
						<img src={`/src/assets/${product.foto}`} alt={product.nombre} />
					</figure>
					<div className='info-product'>
						<h2>{product.descripcion}</h2>
						<p className='price'>${product.precio}</p>
						<button onClick={() => onAddProduct(product)}>
							Añadir al carrito
						</button>
					</div>
				</div>
			))}
		</div>
	);
};
