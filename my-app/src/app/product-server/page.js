import React from "react";
import { getProducts } from "@/app/apiservices/productApi";
import ProductList from "../components/productList/ProductList";

const ProductServer = async () => {
  const data = await getProducts();
  console.log(data);
  return (
    <div>
      <h1>ProductServer</h1>
      <ProductList data={data} />
    </div>
  );
};

export default ProductServer;
