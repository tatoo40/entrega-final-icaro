const validarProducto = (req, res, next) => {
    const { nombre, descripcion, categoria_id, precio } = req.body;
    
    if (!nombre || !descripcion || !categoria_id || !precio) {
      return res.status(400).json({ error: 'Faltan datos para poder ingresar el producto' });
    }
  
    // You can add more complex validation rules here if needed
  
    next(); // Call next to proceed to the next middleware or route handler
  };
  
  module.exports = { validarProducto };