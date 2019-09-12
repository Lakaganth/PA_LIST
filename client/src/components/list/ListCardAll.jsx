import React from "react";
import "./List.scss";
import { Checkbox } from "react-materialize";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_PRODUCT_COMPLETED } from "./../../queries/index";

const ListCard = ({ pList }) => {
  const [completed, setCompleted] = React.useState({
    comp: pList.product_completed
  });

  const [updateComp] = useMutation(UPDATE_PRODUCT_COMPLETED);

  console.log(completed.comp);

  return (
    <div className="list-card">
      <React.Fragment>
        <div className="prd-content">
          <p className="prd-name">{pList.product_name}</p>
          <p className="prd-category">{pList.product_category}</p>
          <p className="prd-price">
            <span>&#163;</span>
            {pList.product_unit_price}
          </p>
        </div>
        <div className="prd-tobuy">
          <p className="prd-name">{pList.product_toBuy}</p>
        </div>

        <div className="list-completed">
          {pList.product_completed ? (
            <Checkbox
              className="check-box"
              value=""
              label=""
              checked
              onChange={() => {
                setCompleted(pv => ({
                  comp: !completed.comp
                }));
                updateComp({
                  variables: {
                    pID: pList._id,
                    comp: completed.comp
                  }
                });
              }}
            />
          ) : (
            <Checkbox
              className="check-box"
              value=""
              label=""
              onChange={() => {
                setCompleted(pv => ({
                  comp: !completed.comp
                }));
                updateComp({
                  variables: {
                    pID: pList._id,
                    comp: completed.comp
                  }
                });
              }}
            />
          )}
        </div>
      </React.Fragment>
    </div>
  );
};

export default ListCard;
