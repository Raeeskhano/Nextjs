import Link from "next/link";
import React from "react";

const ProductCard = ({ data }) => {
  return (
    <>
      {data ? (
        <figure className="bg-white rounded-lg shadow-md p-4">
          <img src={data.thumbnail} alt="nature" />
          <h1 className="text-3xl text-bold tracking-tighter">{data.title}</h1>
          <p className="text-sm tracking-tighter">{data.description}</p>
          <button className="text-blue-900 tracking-tighter cursor-pointer">
            <Link href={`/product-server/${data.id}`}>Read more...</Link>
          </button>
        </figure>
      ) : (
        <figure className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn2nmWoa-66Yo5xylQwIiAxtvMrK2pB2l4CA&s"
            alt="nature"
            className="bg-center bg-cover w-full hover:scale-105 duration-700"
          />
          <h1 className="text-3xl text-bold tracking-tighter">
            Nature Hits Diffrent
          </h1>
          <p className="text-sm tracking-tighter">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet,
            sunt!
          </p>
          <button className="text-blue-900 tracking-tighter cursor-pointer">
            <Link href="#">Read more...</Link>
          </button>
        </figure>
      )}
    </>
  );
};
export default ProductCard;
