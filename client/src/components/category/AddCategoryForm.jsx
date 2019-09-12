import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/react-hooks";
import { ADD_NEW_CATEGORY, GET_ALL_CATEGORIES } from "./../../queries/index";
import { Toast } from "react-materialize";

const AddCategoryForm = () => {
  const [addCategory, { loading }] = useMutation(ADD_NEW_CATEGORY, {
    update(
      cache,
      {
        data: { addNewCategory }
      }
    ) {
      const { getAllCategories } = cache.readQuery({
        query: GET_ALL_CATEGORIES
      });
      cache.writeQuery({
        query: GET_ALL_CATEGORIES,
        data: { getAllCategories: getAllCategories.concat([addNewCategory]) }
      });
    }
  });
  const [newcategory, setNewCategory] = React.useState({
    category_name: ""
  });

  const { category_name } = newcategory;

  const handleChange = e => {
    setNewCategory({
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await addCategory({ variables: { category_name } });
    setNewCategory({
      category_name: ""
    });
    return <Toast options={{ html: "Here you go!" }}>Toast</Toast>;
  };

  return (
    <Form
      className="mt-3"
      onSubmit={e => {
        handleSubmit(e);
      }}
    >
      <Form.Group controlId="category_name">
        <Form.Label>Category Name</Form.Label>
        <Form.Control
          type="text"
          name="category_name"
          value={category_name}
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
  );
};

export default AddCategoryForm;
