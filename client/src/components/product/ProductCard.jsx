import React from "react";

import Moment from "react-moment";
import "./Product.scss";
import AddToList from "./AddToList";
import RemoveProduct from "./RemoveProduct";
import EditComponent from "./EditComponent";

const ProductCard = ({ prod, refetch, edit }) => {
  console.log(edit);

  return (
    <div className="product-card">
      <div className="card-content">
        {edit ? (
          <RemoveProduct
            pID={prod._id}
            refetch={refetch}
            cID={prod.category._id}
          ></RemoveProduct>
        ) : null}

        <p className="prd-name">{prod.product_name}</p>
        <p className="prd-pack">
          {prod.product_pack} pack - {prod.product_size}{" "}
        </p>

        <div>
          <p className="prd-price">
            <span>&#163;</span>
            {prod.product_unit_price}
          </p>
          <p>
            Inv: {prod.product_inventory} on{" "}
            <Moment format="MMM DD">{prod.product_inventory_date}</Moment>{" "}
          </p>
          {/* <Link to={`/category/product/edit/${prod._id}/${prod.category._id}`}>
            Edit
          </Link> */}
          {edit ? (
            <EditComponent prod={prod} refetch={refetch}></EditComponent>
          ) : null}
        </div>
      </div>
      <div className="prd-list-section">
        {" "}
        <AddToList
          pID={prod._id}
          cID={prod.category._id}
          refetch={refetch}
          toBuy={prod.product_toBuy}
          price={prod.product_unit_price}
        ></AddToList>
        {/* <p className="total-price">
          Total: {(prod.product_toBuy * prod.product_unit_price).toFixed(2)}
        </p> */}
      </div>
    </div>
  );
};

export default ProductCard;
