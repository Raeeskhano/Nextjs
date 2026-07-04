import React from "react";

const Products = async () => {
  const response = await fetch(`https://dummyjson.com/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch Products");
  }
  const data = await response.json();
  const results = data.products.slice(0, 10);

  console.log(results);
  return (
    <div>
      <h1>Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-[1280px] mx-auto gap-4">
        {results.map((product, index) => {
          return (
            <div
              key={index}
              className="border p-3 rounded-lg shadow-md space-y-2"
            >
              <h1 className="text-xl font-bold text-gray-200">
                {product.title}
              </h1>
              <p className="text-gray-300">{product.description}</p>
              <p className="text-2xl font-bold text-green-500">
                ${product.price.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
