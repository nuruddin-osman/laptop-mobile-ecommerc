import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./layouts/RootLayout";
import Home from "./pages/home/Index";
import Products from "./pages/products/Index";
import ProductDetails from "./pages/productDetails/Index";
import Cart from "./pages/productCartPage/Index";
import Checkout from "./pages/checkout/Index";
import AccountPage from "./pages/account/Index";
import AboutPage from "./pages/about/Index";
import ContactPage from "./pages/contact/Index";
import Drupt from "./components/Drupt";

const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/:category",
          element: <Products />,
        },
        {
          path: "/product/:id",
          element: <ProductDetails />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/checkout",
          element: <Checkout />,
        },
        {
          path: "/account",
          element: <AccountPage />,
        },
        {
          path: "/about",
          element: <AboutPage />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/d",
          element: <Drupt />,
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
