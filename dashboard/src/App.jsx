import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/home/Index";

const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />,
    </>
  );
};

export default App;
