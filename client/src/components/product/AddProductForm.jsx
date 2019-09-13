import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  ADD_NEW_PRODUCT,
  GET_ALL_CATEGORIES,
  GET_ALL_SHOPS,
  GET_PRODUCTS_FROM_CATEGORIES
} from "../../queries";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

const AddProductForm = () => {
  const [addproduct, { loading }] = useMutation(ADD_NEW_PRODUCT, {
    update(
      cache,
      {
        data: { addNewProduct }
      }
    ) {
      console.log(addNewProduct.category._id);
      const { getAllProductsForCategory } = cache.readQuery({
        query: GET_PRODUCTS_FROM_CATEGORIES,
        variables: { cID: addNewProduct.category._id }
      });
      cache.writeQuery({
        query: GET_PRODUCTS_FROM_CATEGORIES,
        variables: { cID: addNewProduct.category._id },
        data: {
          getAllProductsForCategory: getAllProductsForCategory.concat([
            addNewProduct
          ])
        }
      });
    }
  });
  const getCategories = useQuery(GET_ALL_CATEGORIES);
  const getshops = useQuery(GET_ALL_SHOPS);

  const [newProduct, setNewProduct] = React.useState({
    product_name: "",
    product_pack: 0,
    product_size: "0",
    product_unit_price: 0.0,
    product_inventory: 0,
    product_inventory_date: "",
    category_name: "",
    primary_shop: "",
    secondary_shop: ""
  });

  const {
    product_name,
    product_pack,
    product_size,
    product_unit_price,
    product_inventory,
    product_inventory_date,
    category_name,
    primary_shop,
    secondary_shop
  } = newProduct;

  const getAllCategories = () => {
    const { data, loading, error } = getCategories;
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return data.getAllCategories.map(category => (
      <option key={category._id}>{category.category_name}</option>
    ));
  };

  const getAllShops = () => {
    const { data, loading, error } = getshops;
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return data.getAllShops.map(shop => (
      <option key={shop._id}>{shop.shop_name}</option>
    ));
  };

  const handleChange = e => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    addproduct({
      variables: {
        product_name,
        product_pack,
        product_size,
        product_unit_price,
        product_inventory,
        product_inventory_date,
        category_name,
        primary_shop,
        secondary_shop
      }
      // refetchQueries: [{ query: getCategories }]
    });
    setNewProduct({
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
  };
  return (
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
          name="product_unit_price"
          value={product_pack}
          onChange={e => {
            setNewProduct({
              ...newProduct,
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
          onChange={handleChange}
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
            setNewProduct({
              ...newProduct,
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
            setNewProduct({
              ...newProduct,
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
            setNewProduct({
              ...newProduct,
              product_inventory_date: e
            });
          }}
          dateFormat="MMMM d, yyyy "
        />
      </Form.Group>
      {category_name === null ? (
        <Form.Group controlId="category_name">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category_name"
            onChange={e => {
              setNewProduct({
                ...newProduct,
                category_name: e.target.value
              });
            }}
          >
            <option>Choose...</option>
            {getAllCategories()}
          </Form.Control>
        </Form.Group>
      ) : (
        <Form.Group controlId="category_name">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="category_name"
            onChange={e => {
              setNewProduct({
                ...newProduct,
                category_name: e.target.value
              });
            }}
          >
            <option>Choose...</option>
            {getAllCategories()}
          </Form.Control>
        </Form.Group>
      )}

      <Form.Group controlId="primary_shop">
        <Form.Label>Primary Shop</Form.Label>
        <Form.Control
          as="select"
          name="primary_shop"
          onChange={e => {
            setNewProduct({
              ...newProduct,
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
            setNewProduct({
              ...newProduct,
              secondary_shop: e.target.value
            });
          }}
        >
          <option>Choose...</option>
          {getAllShops()}
        </Form.Control>
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
  );
};

export default AddProductForm;
