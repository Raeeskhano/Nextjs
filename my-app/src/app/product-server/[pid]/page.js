import React from "react";
import { getProductDetails } from "@/app/apiservices/productApi";
import ProductDetailsData from "@/app/components/productList/ProductDetails";

const ProductDetails = async ({ params }) => {
  let { pid } = await params;
  let data = await getProductDetails(pid);

  return (
    <div>
      <ProductDetailsData data={data} />
    </div>
  );
};

export default ProductDetails;
