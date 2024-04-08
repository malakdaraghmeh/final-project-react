import React from "react";
import Hero from "../../hero/components/Hero";
import Categories from "../../categories/components/Categories.jsx";

export default function Home() {
  return (
    <>
      <div className="container padding-bottom">
        <Hero />
        <Categories />
      </div>
    </>
  );
}
