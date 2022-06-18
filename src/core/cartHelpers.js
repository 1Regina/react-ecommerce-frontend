import { createSearchParams } from "react-router-dom";

export const addItem = (item, next) => {
  let cart = [];
  if (typeof window !== "undefined") {
    console.log(`aaaaa`);
    if (localStorage.getItem("cart")) {
      console.log(`bbb`);
      cart = JSON.parse(localStorage.getItem("cart"));
      console.log(`cart`, cart);
    }
    cart.push({
      ...item,
      count: 1,
    });
    // to solve duplicates when same item is clicked. Set remove duplicate n Array.from create a new array without duplicates with the set. Process:
    // remove duplicates
    // build an Array from new Set and turn it back into array using Array.from
    // so that later we can re-map it
    // new set will only allow unique values in it
    // so pass the ids of each object/product
    // If the loop tries to add the same value again, it'll get ignored
    // ...with the array of ids we got on when first map() was used
    // run map() on it again and return the actual product from the cart

    cart = Array.from(new Set(cart.map((p) => p._id))).map((id) => {
      // compared the map product_id to the earlier id of product in the set and return a cart with id of products
      return cart.find((p) => p._id === id);
    });
    localStorage.setItem("cart", JSON.stringify(cart));
    next();
  }
};

export const itemTotal = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart")).length;
    }
  }
  return 0;
};

export const getCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      return JSON.parse(localStorage.getItem("cart"));
    }
  }
  return []; // if nothing in cart
};

export const updateItem = (productId, count) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    // cart.map((product, i) => {
    //   if (product._id === productId) {
    //     cart[i].count = count
    //   }
    // })
    cart.forEach((product, i) => {
      if (product._id === productId) cart[i].count = count;
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const removeItem = (productId) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.forEach((product, i) => {
      if (product._id === productId) cart.splice(i, 1);
    });

    localStorage.setItem("cart", JSON.stringify(cart));
  }
  return cart
};
