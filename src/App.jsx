import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/Root.jsx";
import Home from "./pages/home/components/Home.jsx";
import Categories from "./pages/categories/components/Categories.jsx";
import Products from "./pages/products/components/Products.jsx";
import Register from "./Auth/register/Register.jsx";
import Login from "./Auth/login/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./Auth/forgetPassword/ForgetPassword.jsx";
import SendCode from "./Auth/forgetPassword/SendCode.jsx";
import CategoryProducts from "./pages/categoryProducts/components/CategoryProducts.jsx";
import ProductId from "./pages/productsId/components/ProductId.jsx";
import Cart from "./pages/cart/components/Cart.jsx";
import CreateOrder from "./pages/createOrder/components/CreateOrder.jsx";
import UserContextProvider from "./context/UserContext.jsx";
import Profile from "./pages/profile/components/Profile.jsx";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/category/:id",
          element: <CategoryProducts />,
        },

        {
          path: "/products",
          element: <Products />,
        },

        {
          path: "/cart",
          element: <Cart />,
        },

        {
          path: "/productsid/:id",
          element: <ProductId />,
        },
        
        {
          path:"/profile",
          element:<Profile/>,
        },
        
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/sendcode",
          element: <SendCode />,
        },
        {
          path: "/forgetPassword",
          element: <ForgetPassword />,
        },
      
        {
          path: "/createOrder",
          element: <CreateOrder />,
        },
       
      ],
    },
  ]);
  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
      <ToastContainer />
    </>
  );
}
