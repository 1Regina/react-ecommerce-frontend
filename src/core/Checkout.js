import React, { useState, useEffect } from "react";
import {
  getProducts,
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from "./apiCore";
import { emptyCart } from "./cartHelpers";
import Card from "./Card";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";

const Checkout = ({ products, setRun = (f) => f, run = undefined }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    // console.log(userId, token),
    getBraintreeClientToken(userId, token)
      .then((result) => {
        console.log(`aaa`, userId, `bbb`, token, "qqq", result);
        if (result.error) {
          setData({ ...result, error: result.error });
        } else {
          setData({ clientToken: result.clientToken });
        }
      })
      .catch((error) => console.log(error));
  };
  // bcos getToken run when there is change in state ie have to useEffect
  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const showCheckout = () => {
    return isAuthenticated() ? (
      // <button className="btn btn-success">Checkout</button>
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>{" "}
      </Link>
    );
  };

  const buy = () => {
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    // console.log(`aaaa.`, data.instance)
    if (!data?.instance?.requestPaymentMethod) return console.log("buy error");
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((result) => {
        // console.log(result);
        nonce = result.nonce;
        // once you have nonce (card type, card number) send nonse as 'paymentMethodNonce'
        // and also total to be charged
        // console.log(
        //   `send nonce and total to process: `,
        //   nonce,
        //   getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        };
        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            // setData ({...response, success:response.success })
            // empty cart
            emptyCart(() => {
              setRun(!run); // update parent state
              console.log("payment success and empty cart");
              setData({
                loading: false,
                success: true,
              });
            });
            // })
            // create order
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        // console.log(`dropin error: `, error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    // whenever i click somewhere else on page, the alert error will disappear
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = (success) => (
    // if success, it will show. otherwise none
    <div
      className="alert alert-info"
      style={{ display: success ? "" : "none" }}
    >
      Thanks! Your payment was successful!
    </div>
  );

  return (
    <div>
      {/* {JSON.stringify(products)} */}
      <h2>Total: ${getTotal()}</h2>
      {showSuccess(data.success)}
      {showError(data.error)}
      {showCheckout()}
    </div>
  );
};

export default Checkout;
