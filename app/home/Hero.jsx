"use client";
import React from "react";
import Img from "../components/Img";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import Typewriter from "typewriter-effect";

const Hero = () => {
  return (
    <section className="bg-tertiary py-7">
      <div className="flex max-w-screen-xl min-h-[calc(100vh-64px)] flex-col lg:flex-row gap-x-40 gap-y-16 px-4 py-8 mx-auto lg:gap-8 lg:py-16 items-center">
        <div className="mx-auto place-self-center flex flex-col gap-y-3 text-center lg:text-start">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold md:text-5xl xl:text-5xl text-black">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString("Welcome to SkillzMart")
                  .pauseFor(2000)
                  .deleteChars(5)
                  .typeString(" Smart")
                  .pauseFor(1500)
                  .deleteChars(6)
                  .typeString("s Mart")
                  .pauseFor(1500)
                  .deleteChars(6)
                  .typeString("zMart")
                  .start();
              }}
              // options={{ cursor: "" }}
            />
          </h1>
          <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-md lg:text-lg">
            Connecting Students in OOU Ibogun Campus with Skills, Products, and
            Services
          </p>
          {/* CTA Link and form */}
          <div className="flex flex-col lg:flex-row gap-y-7 gap-x-5">
            <Link
              href="/products"
              className="btn btn-primary text-white lg:w-fit"
            >
              Get started
            </Link>
            <form className="w-full lg:w-4/5 flex flex-1">
              <input
                type="text"
                name="product"
                className="input input-bordered border-r-0 border-gray-400 rounded-r-none focus:outline-none w-full"
                placeholder="Search for a product..."
              />
              <button
                type="submit"
                className="bg-primary p-3 text-xl text-white rounded-r-lg"
              >
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
        {/* Hero Image */}
        <div className="lg:mt-0 w-4/5 md:w-3/5 lg:w-2/5">
          <Img src="/hero.png" className={"mx-auto"} alt="mockup" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
