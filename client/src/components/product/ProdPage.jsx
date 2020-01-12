import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/react-hooks";
import { GET_PRODUCTS_FROM_CATEGORIES } from "../../queries";
import Loader from "../utils/Loader";
import ProductCard from "./ProductCard";
import Button from "react-bootstrap/Button";
import { Switch } from "react-materialize";
import "./Product.scss";

const ProdPage = ({ match }) => {
  const cID = match.params.cID;
  const getProducts = useQuery(GET_PRODUCTS_FROM_CATEGORIES, {
    variables: { cID }
  });
  const [editProd, setEditProd] = React.useState(false);

  const handleEdit = () => {
    setEditProd(!editProd);
  };

  const { data, loading, error, refetch } = getProducts;

  if (loading) return <Loader></Loader>;

  if (error) return `Error! ${error}`;

  return (
    <React.Fragment>
      <div className="product-page">
        <div className="buts">
          <div className="back-but">
            <Button>
              <Link to="/category">Back</Link>{" "}
            </Button>
          </div>

          <div className="edit-switch">
            <Switch offLabel="" onLabel="Edit" onChange={handleEdit} />
          </div>
        </div>

        <div className="product">
          {data.getAllProductsForCategory.map(p => (
            <ProductCard
              prod={p}
              refetch={refetch}
              key={p._id}
              edit={editProd}
            ></ProductCard>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProdPage;
