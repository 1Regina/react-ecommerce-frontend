import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import { read, listRelated } from "./apiCore";
import Card from "./Card";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false);
  const params = useParams();
  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        // fetch related products
        listRelated(data._id).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setRelatedProduct(data);
          }
        });
      }
    });
  };

  // to grab the productId from the url parameter
  useEffect(() => {
    const productId = params.productId;
    loadSingleProduct(productId);
  }, [params]);
  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8">
          {product && product.description && (
            <Card product={product} showViewProductButton={false} />
          )}
          {/* {JSON.stringify(product)} */}
        </div>
        {/* <div className="col-4">
        <h4>Related Products</h4>
        {relatedProduct.map((p, i)=>(      
          <div className="mb-3">
            <Card key={i} product={p}></Card>
          </div>
        ))}
       </div> */}
        <div className="col-4">
          <h4>Related products</h4>
          {relatedProduct.length < 1 ? (
            <div>
              <h2>No related products</h2>
            </div>
          ) : (
            relatedProduct.map((p, i) => (
              <div className="mb-3">
                <Card key={i} product={p} />
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
