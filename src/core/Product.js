import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { read } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const params = useParams();
  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
      }
    });
  };

  // to grab the productId from the url parameter
  useEffect(() => {
    const productId = params.productId;
    loadSingleProduct(productId);
  }, []);
  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
 
      <div className="row">
        {
        product && product.description && 
        <Card product ={product} showViewProductButton={false}></Card>

      }
        {/* {JSON.stringify(product)} */}
        </div>
    </Layout>
  );
};

export default Product;
