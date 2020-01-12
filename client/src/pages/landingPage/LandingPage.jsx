import React from "react";
import { Link } from "react-router-dom";

import "./LandingPage.scss";
const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="create-list">
        <Link to="/category">Inventory</Link>
      </div>
      <div className="today-list">
        <Link to="/list">Procurement List</Link>
      </div>
    </div>
  );
};

export default LandingPage;
