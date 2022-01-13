import React from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import Categories from "../components/Categories";
import Products from "../components/Products";
import Footer from "../components/Footer";
import {TitleCart} from "../components/Styled_components";

const Home = () => {
  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories />
      <TitleCart><b>Los más destacados</b></TitleCart>
      <Products />
      <Footer />
    </div>
  );
};

export default Home;
