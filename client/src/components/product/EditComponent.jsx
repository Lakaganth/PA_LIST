import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { GET_ALL_CATEGORIES, GET_ALL_SHOPS, EDIT_PRODUCT } from "../../queries";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import Loader from "../utils/Loader";

const EditComponent = ({ prod, refetch }) => {
  const [edit, setEdit] = React.useState(false);
  const getCategories = useQuery(GET_ALL_CATEGORIES);
  const getshops = useQuery(GET_ALL_SHOPS);
  const [editExistingProduct, { loading }] = useMutation(EDIT_PRODUCT);

  const [editProduct, setEditProduct] = React.useState({
    product_name: "",
    product_pack: "",
    product_size: "",
    product_unit_price: "",
    product_inventory: "",
    product_inventory_date: "",
    category_name: "",
    primary_shop: "",
    secondary_shop: ""
  });

  React.useEffect(() => {
    setEditProduct({
      product_name: prod.product_name,
      product_pack: prod.product_pack,
      product_size: prod.product_size,
      product_unit_price: prod.product_unit_price,
      product_inventory: prod.product_inventory,
      product_inventory_date: "",
      category_name: "",
      primary_shop: "",
      secondary_shop: ""
    });
  }, []);

  const pID = prod._id;
  //   console.log(prod);

  const {
    product_name,
    product_pack,
    product_size,
    product_unit_price,
    product_inventory,
    product_inventory_date
  } = editProduct;

  const handleEdit = e => {
    setEdit(!edit);
  };

  const handleChange = e => {
    setEditProduct({
      ...editProduct,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    console.log(product_pack);
    editExistingProduct({
      variables: {
        pID,
        product_name,
        product_pack,
        product_size,
        product_unit_price,
        product_inventory,
        product_inventory_date
      }
    });
    setEdit(false);
    refetch();
  };
  if (loading) return <Loader></Loader>;

  return (
    <div>
      <Button small className="btn-small" onClick={handleEdit}>
        Edit
      </Button>
      {edit ? (
        <Form
          className="mt-3"
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
          <Form.Group controlId="product_name">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="product_name"
              value={product_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="product_pack">
            <Form.Label>Product Pack</Form.Label>
            <Form.Control
              type="number"
              name="product_pack"
              value={product_pack}
              onChange={e => {
                setEditProduct({
                  ...editProduct,
                  product_pack: parseInt(e.target.value)
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="product_size">
            <Form.Label>Product Size</Form.Label>
            <Form.Control
              type="text"
              name="product_size"
              value={product_size}
              onChange={e => {
                setEditProduct({
                  ...editProduct,
                  product_size: e.target.value
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="product_unit_price">
            <Form.Label>Product Unit Price</Form.Label>
            <Form.Control
              type="number"
              name="product_unit_price"
              step="0.01"
              value={product_unit_price}
              onChange={e => {
                setEditProduct({
                  ...editProduct,
                  product_unit_price: parseFloat(e.target.value)
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="product_inventory">
            <Form.Label>Product Available Inventory</Form.Label>
            <Form.Control
              type="number"
              name="product_inventory"
              value={product_inventory}
              onChange={e => {
                setEditProduct({
                  ...editProduct,
                  product_inventory: parseInt(e.target.value)
                });
              }}
            />
          </Form.Group>
          <Form.Group controlId="product_inventory_date">
            <Form.Label>Product Inventory Date</Form.Label>
            <DatePicker
              selected={product_inventory_date}
              placeholderText="Click to select a date "
              value={product_inventory_date}
              onChange={e => {
                setEditProduct({
                  ...editProduct,
                  product_inventory_date: e
                });
              }}
              dateFormat="MMMM d, yyyy "
            />
          </Form.Group>
          {/* <Form.Group controlId="category_name">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category_name"
              onChange={e => {
                setEditProduct({
                  ...editProduct,
                  category_name: e.target.value
                });
              }}
              required
            >
              <option>{category_name}</option>
              {getAllCategories()}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="primary_shop">
            <Form.Label>Primary Shop</Form.Label>
            <Form.Control
              as="select"
              name="primary_shop"
              onChange={e => {
                setEditProduct({
                  ...editProduct,
                  primary_shop: e.target.value
                });
              }}
            >
              <option>Choose...</option>
              {getAllShops()}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="secondary_shop">
            <Form.Label>Secondary Shop</Form.Label>
            <Form.Control
              as="select"
              name="secondary_shop"
              onChange={e => {
                setEditProduct({
                  ...editProduct,
                  secondary_shop: e.target.value
                });
              }}
            >
              <option>Choose...</option>
              {getAllShops()}
            </Form.Control>
          </Form.Group> */}
          <Button
            variant="primary"
            className="mx-7"
            type="submit"
            disabled={loading}
          >
            Submit
          </Button>
        </Form>
      ) : null}
    </div>
  );
};

export default EditComponent;
