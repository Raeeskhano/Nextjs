import React from "react";
import ProductCard from "../common/ProductCard";

const LatestProducts = () => {
  return (
    <section className="py-10 bg-blue-50">
      <h2 className="text-3xl font-bold text-center tracking-tighter">
        Latest Products
      </h2>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </div>
    </section>
  );
};

export default LatestProducts;
