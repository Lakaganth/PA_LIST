import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, TextInput, Icon } from "react-materialize";
import { UPDATE_TOBUY_LIST, GET_PRODUCTS_FROM_CATEGORIES } from "../../queries";
import Loader from "./../utils/Loader";

import "./Product.scss";

const AddToList = ({ pID, toBuy, refetch, cID }) => {
  const [quant, setQuant] = React.useState(toBuy);
  const [updateQuant, { loading }] = useMutation(UPDATE_TOBUY_LIST, {
    update(cache, data) {
      const { getAllProductsForCategory } = cache.readQuery({
        query: GET_PRODUCTS_FROM_CATEGORIES,
        variables: { cID: cID }
      });
      console.log(pID);
      const prod = getAllProductsForCategory.map(p => {
        if (p._id === pID) {
          console.log(p);
          p.product_toBuy = quant;
        }
        return p;
      });

      cache.writeQuery({
        query: GET_PRODUCTS_FROM_CATEGORIES,
        data: {
          getAllProductsForCategory: prod
        }
      });
      console.log(getAllProductsForCategory);
    }
  });
  const handleInc = () => {
    setQuant(quant + 1);
  };
  const handleDec = () => {
    setQuant(quant - 1);
  };
  const handleUpdate = () => {
    updateQuant({ variables: { pID, toBuy: quant } });
    refetch();
  };

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="add-to-list-comp">
      {quant > 0 ? (
        // <Button
        //   floating
        //   small
        //   className="pink"
        //   waves="light"
        //   icon="remove"
        //   onClick={handleDec}
        // />
        <div className="add-div" onClick={handleDec}>
          <Icon>remove</Icon>
        </div>
      ) : null}

      <div className="p-list-number">
        <TextInput type="number" value={quant.toString()} readOnly />
      </div>
      {/* <Button
        floating
        small
        className="blue"
        waves="light"
        icon="add"
        onClick={handleInc}
      /> */}
      <div className="add-div" onClick={handleInc}>
        <Icon>add</Icon>
      </div>
      {/* <Button
        floating
        small
        className="red"
        waves="light"
        icon="send"
        onClick={handleUpdate}
      /> */}
      <div className="add-div" onClick={handleUpdate}>
        <Icon>chevron_right</Icon>
      </div>
    </div>
  );
};

export default AddToList;
