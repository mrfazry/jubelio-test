import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
// import "./App.css";
import { Container, Row, Col } from "reactstrap";
import Card from "./Card";

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async function () {
      const res = await axios.get(`http://localhost:8000/products`);
      setProducts(res.data.data);
    })();
  }, []);

  return (
    <div className="App">
      <Container fluid={true}>
        <h1 className="text-center">Daftar produk aktif kamu</h1>
        <Col md={12}>
          <Row>
            {products.map((product, index) => (
              <Col md={4} sm={3} key={`product-${product.sku}-${index}`}>
                <Card product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Container>
    </div>
  );
}

export default App;
