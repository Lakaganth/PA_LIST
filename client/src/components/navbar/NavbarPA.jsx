import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
// import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

const NavbarPA = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="nav-Container"
    >
      <Navbar.Brand>
        <NavLink to="/">P&A Stores</NavLink>
      </Navbar.Brand>
      <br />
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="ml-auto">
          <Nav className="mx-3 ">
            <NavLink to="/add-Category">Category</NavLink>
          </Nav>
          <Nav className="mx-3 ">
            <NavLink to="/add-Shop">Shop</NavLink>
          </Nav>
          <Nav className="mx-3 ">
            <NavLink to="/add-product">Product</NavLink>
          </Nav>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarPA;
