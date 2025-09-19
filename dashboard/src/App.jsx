import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home/Index";
import Products from "./pages/products/Index";

const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/products",
      element: <Products />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
