import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Products from "./pages/products/Index";

const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
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
