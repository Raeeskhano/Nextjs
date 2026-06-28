"use client";

import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const BannerSec = () => {
  let [model, setModel] = useState(false);

  return (
    <>
      <div
        className={`w-[350px] fixed duration-700 ${model ? "top-[50%]" : "top-[-50%]"} left-[50%] transform -transform-x-1/2 -translate-y-1/2`}
      >
        <form className="bg-white p-6 rounded shadow-md">
          <h2 className="text-2xl font-bold relative mb-4">
            Enquire Now
            <button
              onClick={() => {
                setModel(false);
              }}
              type="button"
              className="absolute top-0 right-0 text-gray-500 hover:text-gray-800 cursor-pointer"
            >
              <IoMdClose />
            </button>
          </h2>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              id="name"
              placeholder="your name"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              type="email"
              id="email"
              placeholder="your email"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="msg"
            >
              Message:
            </label>
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              type="text"
              id="msg"
              rows="4"
              placeholder="your Message..."
            />
          </div>

          <div className="mb-4">
            <input
              className="bg-blue-400 mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              type="submit"
            />
          </div>
        </form>
      </div>
      <section
        className="bg-cover bg-center min-h-75"
        style={{ backgroundImage: "url(/images/banner.jpg)" }}
      >
        <div className="flex justify-center items-center">
          <div className="text-white flex flex-col gap-2 items-start tracking-tighter mt-10">
            <h1 className="text-5xl text-bold tracking-tighter">
              The Banner That's looked Realistics
            </h1>
            <p className="w-full sm:w-[80vw] md:w-[60vw] lg:w-[40vw]">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse,
              temporibus dolores! Ducimus inventore quibusdam nisi reiciendis,
              ea quas eligendi sequi in dolores quis. Mollitia reprehenderit,
              eveniet repellendus nisi modi eum?
            </p>
            <button
              onClick={() => {
                setModel(true);
              }}
              className="bg-blue-200 rounded text-black p-1"
            >
              Enquire now
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerSec;
