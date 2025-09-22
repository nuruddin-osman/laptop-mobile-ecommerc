import React from "react";
import useProducts from "./FetchProducts";

const Drupt = () => {
  const { products } = useProducts();
  console.log(products);
  return <div>Drupt</div>;
};

export default Drupt;
