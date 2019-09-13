import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_ALL_CATEGORIES } from "../../queries";
import Loader from "../utils/Loader";
import { Link } from "react-router-dom";

import "./Category.scss";

const CategoryPage = () => {
  const getCategories = useQuery(GET_ALL_CATEGORIES);
  const { data, loading, error } = getCategories;
  if (loading) return <Loader></Loader>;
  if (error) return <div>Error : {error}</div>;

  return (
    <div className="category-page">
      {data.getAllCategories.map(c => {
        return (
          <div key={c._id} className="category-card">
            <Link to={`/category/product/${c._id}`}>{c.category_name}</Link>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryPage;
