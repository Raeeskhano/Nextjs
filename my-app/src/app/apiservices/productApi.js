import axios from "axios";

const getProducts = async () => {
  return await axios
    .get("https://dummyjson.com/products")
    .then((res) => res.data.products);
};

const getProductDetails = async (id) => {
  return await axios
    .get(`https://dummyjson.com/products/${id}`)
    .then((res) => res.data);
};

export { getProducts, getProductDetails };
