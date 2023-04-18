import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/1.png";

function Navigation() {
  return (
    <nav>
      <a href="/" className="logo">
        <img src={logo} alt="" className="logo-img" />

        <h2 className="logo-header ">
          Chem<span className="purple">Inspect </span>
        </h2>
      </a>
      <div className="links">
        <Link
          to="/"
          className=" nav__link--anchor
          link__hover--effect
          link__hover--effect--black"
        >
          {" "}
          Home
        </Link>
        <Link
          to="/weather-container"
          className=" nav__link--anchor
          link__hover--effect
          link__hover--effect--black
         "
        >
          Weather
        </Link>
        <Link
          to="/chemical-database "
          className=" nav__link--anchor
          link__hover--effect
          link__hover--effect--black
         "
        >
          Chemical Database
        </Link>
        <Link
          to="/incident-tracking"
          className=" nav__link--anchor
          link__hover--effect
          link__hover--effect--black"
        >
          Incident Tracking
        </Link>
        <Link
          to="/training-tool "
          className=" nav__link--anchor
          link__hover--effect
          link__hover--effect--black"
        >
          Training Tool
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
