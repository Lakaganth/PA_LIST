import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { REMOVE_PRODUCT } from "../../queries";
import { Button } from "react-materialize";
import "./Product.scss";
const RemoveProduct = ({ pID, cID, refetch }) => {
  const [removeProduct] = useMutation(REMOVE_PRODUCT);

  const handleRemove = () => {
    console.log("yes");
    removeProduct({
      variables: { pID, cID }
    });
    refetch();
  };
  return (
    <div className="del-but">
      <Button floating className="red" onClick={handleRemove} small>
        X
      </Button>
    </div>
  );
};

export default RemoveProduct;
