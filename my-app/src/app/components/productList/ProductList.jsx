"use client";

import React, { useState } from "react";
import ProductCard from "../common/ProductCard";

const ProductList = ({ data }) => {
  const initialProducts = Array.isArray(data) ? data : [];
  const [product, setProduct] = useState(initialProducts);
  return (
    <div className="max-w-[1320px] mx-auto gap-4">
      <div className="grid grid-cols-4 gap-4">
        {product.map((obj, index) => (
          <ProductCard data={obj} key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
