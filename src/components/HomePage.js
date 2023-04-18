import React from "react";
import "../styles/HomePage.css";
import science from "../images/science.svg";
import section2 from "../images/section2.svg";
import section3 from "../images/section3.svg";

function HomePage() {
  return (
    <React.Fragment>
      <section className="section-1">
        <div className="landing--div">
          <img src={science} alt="scientist" className="scientist--img" />
          <div className="landing--text">
            <h2 className="home-page--header">
              Chem
              <span className="purple-text">Inspect</span>
            </h2>
            <p className="home-page--subheader">
              Chemical Database and Emergency Response Training Tool.
            </p>
          </div>
        </div>
      </section>

      <section className="section-2">
        <div className="section-2--div row-reverse">
          <div className="section-2--div--text--div">
            .
            <h1 className="section-2--div--header">
              Prioritising <span className="purple-text"> Safety</span> Whilst
              Minimising Risk.
            </h1>
            <p className="section-2--div--subheader">
              Our Interactive Training Tool allows for the Simulations of
              Chemical Spillage Incidents.
            </p>
            {/* <div className="welcome--buttons">
              <a href="chemical-database">
                {" "}
                <button> Search Chemicals</button>{" "}
              </a>
              <a href="incident-tracking">
                {" "}
                <button> Incident Tracking</button>{" "}
              </a>
              <a href="training-tool">
                {" "}
                <button> Training Tool</button>{" "}
              </a>
            </div> */}
          </div>

          <div className="img--div">
            <img
              src={section2}
              alt="spreadsheet"
              className="spreadsheet--img"
            />
          </div>
        </div>
      </section>

      <section className="section-3">
        <div className="section-2--div ">
          <div className="section-2--div--text--div">
            .
            <h1 className="section-2--div--header">
              The<span className="purple-text"> Latest </span> Chemical
              Information Available
            </h1>
            <p className="section-2--div--subheader">
              Search through our vast database for insights on any chemical.
            </p>
            {/* <div className="welcome--buttons">
              <a href="chemical-database">
                {" "}
                <button> Search Chemicals</button>{" "}
              </a>
              <a href="incident-tracking">
                {" "}
                <button> Incident Tracking</button>{" "}
              </a>
              <a href="training-tool">
                {" "}
                <button> Training Tool</button>{" "}
              </a>
            </div> */}
          </div>

          <div className="img--div">
            <img
              src={section3}
              alt="spreadsheet"
              className="spreadsheet--img"
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default HomePage;
