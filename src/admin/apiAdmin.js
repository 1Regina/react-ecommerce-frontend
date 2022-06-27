import { API } from "../config";

export const createCategory = async (userId, token, category) => {
  try {
    const response = await fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category), // to convert object to json string for backend
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const createProduct = async (userId, token, product) => {
  try {
    const response = await fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        // "Content-Type": "application/json", removing bcos sending a form data
        Authorization: `Bearer ${token}`,
      },
      body: product, //remove bcos sending a form data ie product: JSON.stringify(product), // to convert object to json string for backend
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

// export const getCategories = async () => {
//   try{ const response = fetch(`${API}/categories`, {
//     method: "GET",
//   })
//     // .then((response) => {
//     //   return response.json()
//     return await response.json();
//     } catch(err)
//     {console.log(err)};
// };

export const getCategories = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({status, orderId})
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
