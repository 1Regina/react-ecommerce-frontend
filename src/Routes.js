import React from "react";
// BrowserRouter is a browser wrapper component to wrap the rest of routes via their parameters. Goal: wrap routes in switch. Main wrapper = BrowserRouter which makes the props available in this component
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Home from "./core/Home";
// import Menu from "./core/Menu"
import { createMemoryHistory } from "history";
import PrivateRoute from "./auth/PrivateRoute"; // only accessible for logined users
import AdminRoute from "./auth/AdminRoute";
import Dashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import NotFound from "./views/NotFound";
import Forbidden from "./views/Forbidden";
import Shop from "./core/Shop";
import Product from "./core/Product";
import Cart from "./core/Cart";

const Routes6 = () => {
  const history = createMemoryHistory();
  return (
    <BrowserRouter location={history.location}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/user/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/create/category"
          element={
            <AdminRoute>
              <AddCategory />
            </AdminRoute>
          }
        />

        <Route
          path="/create/product"
          element={
            <AdminRoute>
              <AddProduct />
            </AdminRoute>
          }
        />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routes6;
