import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_PRODUCTS_FROM_CATEGORIES } from "../../queries";
import Loader from "../utils/Loader";
import ProductCard from "./ProductCard";

const ProductPage = ({ match }) => {
  const cID = match.params.cID;
  const getProducts = useQuery(GET_PRODUCTS_FROM_CATEGORIES, {
    variables: { cID }
  });

  const { data, loading, error, refetch } = getProducts;

  if (loading) return <Loader></Loader>;

  if (error) return `Error! ${error}`;
  // console.log(data);
  return (
    <div className="product-page">
      {data.getAllProductsForCategory.map(p => (
        <ProductCard prod={p} refetch={refetch} key={p._id}></ProductCard>
      ))}
    </div>
  );
};

export default ProductPage;
