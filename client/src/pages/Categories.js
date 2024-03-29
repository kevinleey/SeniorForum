import React from "react";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import "../styles/categories.css";
import { POST_CATEGORIES } from "../constants";
import CategoryBox from "../components/categories/CategoryBox";

function Categories() {
  return (
    <div id="page-background">
      <Navbar />
      <div id="page-container">
        <h1 className="page-title">Categories</h1>
        <div id="box-holder">
          <CategoryBox category={POST_CATEGORIES.CATEGORY_1} />
          <CategoryBox category={POST_CATEGORIES.CATEGORY_2} />
          <CategoryBox category={POST_CATEGORIES.CATEGORY_3} />
          <CategoryBox category={POST_CATEGORIES.CATEGORY_4} />
          <CategoryBox category={POST_CATEGORIES.CATEGORY_5} />
          <CategoryBox category={POST_CATEGORIES.CATEGORY_6} />
          <CategoryBox category={POST_CATEGORIES.CATEGORY_7} />
          <CategoryBox category={POST_CATEGORIES.CATEGORY_8} />
          <CategoryBox category={POST_CATEGORIES.CATEGORY_LAST} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Categories;
