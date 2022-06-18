import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getCart, removeItem } from "./cartHelpers";
import Card from "./Card";
import Checkout from "./Checkout";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);

  // useEffect(() => {
  //   setItems(getCart());
  // }, [items]);// [items] bcos localStorage cart will refresh/less everytime we change/remove item so we want useEffect to kick in every time items change so that setItems(getCart()) will then run to give the updated Cart
useEffect(() => {
  console.log('MAX DEPTH ...');
    setItems(getCart());
  }, [run]);

  const showItems = (items) => {
    return (
      <div>
        <h2>Your cart has {`${items.length}`} items.</h2>
        <hr />
        {items.map((product, i) => (
          <Card 
              key={i} 
              product={product} 
              showAddToCartButton = {false} 
              cartUpdate = {true} // so this only show in the cart page and nowhere else
              showRemoveProductButton = {true} 
              setRun={setRun}
            run={run}
              />
        ))}
      </div>
    );
  };
  // case of no items in local storage
  const noItemsMessage = () => {
    <h2>
      Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
    </h2>;
  };
  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
       <h2 className="mb-4">Your cart summary</h2>
       <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
