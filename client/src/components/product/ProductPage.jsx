import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";
import { GET_PRODUCTS_FROM_CATEGORIES } from "../../queries";
import Loader from "../utils/Loader";
import ProductCard from "./ProductCard";
import Button from "react-bootstrap/Button";
import "./Product.scss";

const ProductPage = ({ match }) => {
  const cID = match.params.cID;
  const getProducts = useQuery(GET_PRODUCTS_FROM_CATEGORIES, {
    variables: { cID }
  });

  const { data, loading, error, refetch } = getProducts;

  if (loading) return <Loader></Loader>;

  if (error) return `Error! ${error}`;
  //console.log(data);
  return (
    <React.Fragment>
      <div className="product-page">
        <Button className="back-but">
          <Link to="/category">Back</Link>{" "}
        </Button>
        <div className="product">
          {data.getAllProductsForCategory.map(p => (
            <ProductCard prod={p} refetch={refetch} key={p._id}></ProductCard>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProductPage;
