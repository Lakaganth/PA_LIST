import React from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  GET_TODAY_LIST,
  GET_ALL_CATEGORIES,
  LIST_COMPLETED
} from "../../queries";
import Loader from "./../utils/Loader";
import Moment from "react-moment";
import ListCard from "./ListCard";
import ListCardAll from "./ListCardAll";
import { Button, Icon } from "react-materialize";
import Form from "react-bootstrap/Form";

const ListPage = props => {
  const [catFilter, setCatFilter] = React.useState({ catFilter: "All" });
  const getTodayList = useQuery(GET_TODAY_LIST);
  const { data, loading, error } = getTodayList;
  const getCategory = useQuery(GET_ALL_CATEGORIES);
  const [completeList] = useMutation(LIST_COMPLETED);
  const getAllCategories = () => {
    const { data, loading, error } = getCategory;
    if (loading) return "Loading...";
    if (error) return `Error! ${error.message}`;

    return data.getAllCategories.map(category => (
      <option key={category._id}>{category.category_name}</option>
    ));
  };

  if (loading) {
    return <Loader></Loader>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  let total_cost = 0;
  const costArray = data.getTodayList.product.map(p => {
    return p.product_toBuy * p.product_unit_price;
  });

  for (const ele of costArray) {
    total_cost += ele;
  }

  const handleListSubmit = () => {
    completeList({ variables: { lID: data.getTodayList._id } });
    props.history.push("/");
  };
  return (
    <div>
      <h4>
        Hello Raj, Today is{" "}
        <Moment format="MMM DD">{data.getTodayList.created_date}</Moment>{" "}
      </h4>
      <p>
        Today's Purchase cost is <span>&#163;</span>{" "}
        <span className="span-price">{total_cost.toFixed(2)}</span>{" "}
      </p>
      <Form>
        <Form.Group controlId="category_name">
          <Form.Label>Filter</Form.Label>
          <Form.Control
            as="select"
            onChange={e => {
              setCatFilter({
                ...catFilter,
                catFilter: e.target.value
              });
            }}
          >
            {/* <option>Choose...</option> */}
            <option>All</option>
            {getAllCategories()}
          </Form.Control>
        </Form.Group>
      </Form>
      {catFilter.catFilter === "All"
        ? data.getTodayList.product.map(p => (
            <ListCardAll key={p._id} pList={p} catFilter={"All"}></ListCardAll>
          ))
        : data.getTodayList.product.map(p => (
            <ListCard key={p._id} pList={p} catFilter={catFilter}></ListCard>
          ))}
      {/* {data.getTodayList.product.map(p => (
        <ListCard key={p._id} pList={p} catFilter={catFilter}></ListCard>
      ))} */}
      <Button waves="light" onClick={handleListSubmit}>
        Completed
        <Icon right>send</Icon>
      </Button>
    </div>
  );
};

export default ListPage;
