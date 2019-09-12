import React from "react";
import { Link, NavLink } from "react-router-dom";

import { Navbar } from "react-materialize";
const SideNavbarPA = () => {
  return (
    <Navbar
      className=" purple darken-4"
      brand={<Link to="/">P&A Stores</Link>}
      alignLinks="right"
    >
      <NavLink to="/add-Category">Category</NavLink>
      <NavLink to="/add-Shop">Shop</NavLink>
      <NavLink to="/add-product">Product</NavLink>
      <NavLink to="/category">All Product</NavLink>
    </Navbar>
  );
};

export default SideNavbarPA;
