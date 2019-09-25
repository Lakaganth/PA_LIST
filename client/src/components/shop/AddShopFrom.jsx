import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/react-hooks";
import { ADD_NEW_SHOP, GET_ALL_SHOPS } from "../../queries";

const AddShopFrom = () => {
  const [addShop, { loading }] = useMutation(ADD_NEW_SHOP, {
    update(
      cache,
      {
        data: { addNewShop }
      }
    ) {
      const { getAllShops } = cache.readQuery({ query: GET_ALL_SHOPS });
      cache.writeQuery({
        query: GET_ALL_SHOPS,
        data: { getAllShops: getAllShops.concat([addNewShop]) }
      });
    }
  });
  const [newShop, setNewShop] = React.useState({
    shop_name: "",
    shop_location: ""
  });
  const { shop_name, shop_location } = newShop;

  const handleChange = e => {
    setNewShop({
      ...newShop,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    addShop({ variables: { shop_name, shop_location } });
    setNewShop({
      shop_name: "",
      shop_location: ""
    });
  };

  return (
    <div className="container">
      <Form
        className="mt-3"
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <Form.Group controlId="shop_name">
          <Form.Label>Shop Name</Form.Label>
          <Form.Control
            type="text"
            name="shop_name"
            value={shop_name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="shop_location">
          <Form.Label>Shop Location</Form.Label>
          <Form.Control
            type="text"
            name="shop_location"
            value={shop_location}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          className="mx-7"
          type="submit"
          disabled={loading}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AddShopFrom;
