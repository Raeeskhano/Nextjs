"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../components/common/ProductCard";
import axios from "axios";

const Product = () => {
  let [product, setProduct] = useState([]);

  let getProducts = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => setProduct(res.data.products));
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div>
      <h1 className="text-center text-3xl py-10">Product</h1>

      <div className="max-w-[1320px] m-10 mx-auto">
        <div className="grid grid-cols-4 gap-4">
          {product.map((obj, index) => (
            <ProductCard data={obj} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
