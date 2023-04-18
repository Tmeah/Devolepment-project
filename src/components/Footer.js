/* eslint-disable import/no-anonymous-default-export */

import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import logo from "../images/2.png";

export default function () {
  return (
    <footer>
      <a className="footer-img--a" href="#">
        <div className="">
          <p className="fa">
            <FontAwesomeIcon
              icon={faArrowUp}
              className="arrow"
            ></FontAwesomeIcon>
          </p>
        </div>
        <img src={logo} alt="" className="footer-logo-img" />
      </a>
      <div className="footer-links">
        <Link
          to="/"
          className=" nav__link--anchor
          link__hover--effect
          link__hover--effect--white"
        >
          {" "}
          Home
        </Link>
        <Link
          to="/chemical-database "
          className=" nav__link--anchor
          link__hover--effect
          link__hover--effect--white
         "
        >
          Chemical Database
        </Link>
        <Link
          to="/incident-tracking"
          className=" nav__link--anchor
          link__hover--effect
          link__hover--effect--white"
        >
          Incident Tracking
        </Link>
        <Link
          to="/training-tool "
          className=" nav__link--anchor
          link__hover--effect
          link__hover--effect--white"
        >
          Training Tool
        </Link>
      </div>
      <h2 className="footer-header">&copy; Copyright 2023 Tausif Meah</h2>
    </footer>
  );
}
