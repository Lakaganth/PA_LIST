import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";

import AddCategoryForm from "./components/category/AddCategoryForm";
import AddShopFrom from "./components/shop/AddShopFrom";
import AddProductForm from "./components/product/AddProductForm";
import SideNavbarPA from "./components/navbar/SideNavbarPA";
import CategoryPage from "./components/category/CategoryPage";
import ProductPage from "./components/product/ProductPage";
import ListPage from "./components/list/ListPage";
import LandingPage from "./pages/landingPage/LandingPage";
import EditProductForm from "./components/product/EditProductForm";

const App = () => {
  return (
    <Fragment>
      <Router>
        <SideNavbarPA></SideNavbarPA>
        <Switch>
          <div className="container">
            <Route path="/" exact component={LandingPage}></Route>
            <Route path="/add-Category" component={AddCategoryForm}></Route>
            <Route path="/add-shop" component={AddShopFrom}></Route>
            <Route path="/add-product" component={AddProductForm}></Route>
            <Route path="/Category" exact component={CategoryPage}></Route>
            <Route path="/list" exact component={ListPage}></Route>
            <Route
              path="/Category/product/:cID"
              exact
              component={ProductPage}
            ></Route>
            <Route
              path="/Category/product/edit/:pID/:cID"
              exact
              component={EditProductForm}
            ></Route>
          </div>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default App;
