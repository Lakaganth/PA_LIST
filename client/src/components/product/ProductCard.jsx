import React from "react";
import { Link } from "react-router-dom";

import Moment from "react-moment";
import "./Product.scss";
import AddToList from "./AddToList";

const ProductCard = ({ prod, refetch }) => {
  // console.log(prod);

  return (
    <div className="product-card">
      <div className="card-content">
        <p className="prd-name">{prod.product_name}</p>
        <div>
          <p className="prd-price">
            <span>&#163;</span>
            {prod.product_unit_price}
          </p>
          <p>
            Inv: {prod.product_inventory} on{" "}
            <Moment format="MMM DD">{prod.product_inventory_date}</Moment>{" "}
          </p>
          <Link to={`/category/product/edit/${prod._id}/${prod.category._id}`}>
            Edit
          </Link>
        </div>
      </div>
      <div className="prd-list-section">
        {" "}
        <AddToList
          pID={prod._id}
          cID={prod.category._id}
          refetch={refetch}
          toBuy={prod.product_toBuy}
        ></AddToList>
        <p className="total-price">
          Total: {(prod.product_toBuy * prod.product_unit_price).toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
