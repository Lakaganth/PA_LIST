import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation, useQuery } from "@apollo/react-hooks";
import {
  GET_ALL_CATEGORIES,
  GET_ALL_SHOPS,
  GET_PRODUCTS_FROM_CATEGORIES,
  EDIT_PRODUCT
} from "../../queries";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { GET_PRODUCT } from "./../../queries/index";
import Loader from "../utils/Loader";

const EditProductForm = ({ match, history }) => {
  const pID = match.params.pID;

  const getProduct = useQuery(GET_PRODUCT, {
    variables: { pID }
  });
  const { data, error, load } = getProduct;

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
    const onCompleted = data => {
      if (data.getProduct) {
        console.log(data.getProduct);
        setEditProduct({
          product_name: data.getProduct.product_name,
          product_pack: data.getProduct.product_pack,
          product_size: data.getProduct.product_size,
          product_unit_price: data.getProduct.product_unit_price,
          product_inventory: data.getProduct.product_inventory,
          //   product_inventory_date: data.getProduct.product_inventory_date
          category_name: data.getProduct.product_category
          //   primary_shop: data.getProduct,
          //   secondary_shop: data.getProduct.
        });
      }
    };
    const onError = error => {
      return <div>{error}</div>;
    };
    if (onCompleted || onError) {
      if (onCompleted && !load && !error) {
        onCompleted(data);
      } else if (onError && !load && error) {
        onError(error);
      }
    }
  }, [load, data, error]);
  const [editExistingProduct, { loading }] = useMutation(EDIT_PRODUCT, {
    update(
      cache,
      {
        data: { getProduct }
      }
    ) {
      const { getAllProductsForCategory } = cache.readQuery({
        query: GET_PRODUCTS_FROM_CATEGORIES,
        variables: { cID: getProduct.category._id }
      });
      cache.writeQuery({
        query: GET_PRODUCTS_FROM_CATEGORIES,
        variables: { cID: getProduct.category._id },
        data: {
          getAllProductsForCategory: getAllProductsForCategory.concat([
            getProduct
          ])
        }
      });
    }
  });

  const getCategories = useQuery(GET_ALL_CATEGORIES);
  const getshops = useQuery(GET_ALL_SHOPS);

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
  } = editProduct;

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
    setEditProduct({
      ...editProduct,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    editExistingProduct({
      variables: {
        pID,
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
    });
    // setEditProduct({
    //   product_name: "",
    //   product_pack:"",
    //     product_size:"",
    //   product_unit_price: "",
    //   product_inventory: "",
    //   product_inventory_date: "",
    //   category_name: "",
    //   primary_shop: "",
    //   secondary_shop: ""
    // });
    history.push("/category");
  };
  if (load) return <Loader></Loader>;

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
          name="product_pack"
          step="0.01"
          value={product_pack}
          onChange={e => {
            setEditProduct({
              ...editProduct,
              product_pack: parseFloat(e.target.value)
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
      <Form.Group controlId="category_name">
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

export default EditProductForm;
