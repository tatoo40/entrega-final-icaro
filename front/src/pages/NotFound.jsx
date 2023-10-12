import React from 'react';
import { Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import './NotFound.css'; // Importa un archivo CSS personalizado

const NotFound = () => {
  return (
    <div className="not-found-container">
      <Result
        status="404"
        title="Error 404 - Página no encontrada"
        subTitle="La página que estás buscando no existe."
        extra={
          <Link to="/">
            <Button type="primary">Volver al inicio</Button>
          </Link>
        }
      />
      
    </div>
  );
};

export default NotFound;