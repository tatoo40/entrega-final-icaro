import React from "react";
import { Row, Col } from "antd";
import ProductCardAdmin from "./ProductCardAdmin";

const ProductGrid = ({ products }) => {
  return (
    <Row gutter={16}>
      {products.map((product) => (
        <Col span={8} key={product.id}>
          <ProductCardAdmin product={product} />
        </Col>
      ))}
    </Row>

    
  );
};

export default ProductGrid;
