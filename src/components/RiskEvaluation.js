import React, { useState } from "react";
import "../styles/RiskEvaluation.css";

function RiskEvaluation({ incident }) {
  const [s, setS] = useState("Small/Medium");
  const [h, setH] = useState(false);
  const [o, setO] = useState(false);
  const [r, setR] = useState(false);
  const [e, setE] = useState(false);
  const [shelterPossible, setShelterPossible] = useState(false);
  const [stillThreat, setStillThreat] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [screen, setScreen] = useState(1);

  const isRisk = h && s === "Large/V.Large";

  const showInitialAdvice = s !== "Large/V.Large" && !h && !o && !r && !e;

  function handleClose() {
    setShowModal(false);
  }

  function handleSubmit() {
    if (isRisk) {
      setScreen(4); // Proceed to the shelter checklist screen
    } else {
      setScreen(3); // Show the "no further action needed" screen
    }
  }

  function handleShelterChecklistSubmit(e) {
    e.preventDefault();
    if (shelterPossible) {
      setScreen(5); // Proceed to the evaluation screen
    } else {
      setScreen(2); // Show the evacuation screen
    }
  }
  function handleEvaluationSubmit(e) {
    e.preventDefault();
    if (stillThreat) {
      // Reset all the state variables before going back to the first screen
      setS("Small/Medium");
      setH(false);
      setO(false);
      setR(false);
      setE(false);
      setShelterPossible(false);
      setShowModal(true);
      setScreen(1); // Go back to the first screen
    } else {
      setScreen(6); // Show the "it's safe" screen
    }
  }

  // Add the logic for shelter checklist and evaluation screens

  if (screen === 1) {
    return (
      <div className="main-div margin">
        <div className="incident-risk-card">
          <h2>Incident Scenario Details</h2>
          <p>Chemical: {incident.chemical}</p>
          <p>Scale: {incident.scale}</p>
          <p>Duration: {incident.duration}</p>
          <p>Location: {incident.location}</p>
          <p>Wind direction: {incident.wind_direction}</p>
        </div>

        <div className="shore-main-div">
          <h3>SHORE Criteria</h3>

          <div className="shore-option">
            <div className="shore-div-title">
              <h2>Scale/Duration</h2>
            </div>
            <div className="shore-div-btns">
              <label>
                <input
                  type="radio"
                  name="scale"
                  id="radio1"
                  onChange={() => setS("Small/Medium")}
                />
                Small/Medium
              </label>

              <label>
                <input
                  type="radio"
                  name="scale"
                  id="radio2"
                  onChange={() => setS("Large/V.Large")}
                />
                Large/V.Large
              </label>
            </div>
          </div>

          <div className="shore-option">
            <div className="shore-div-title">
              <h2>Toxic or Explosive?</h2>
            </div>

            <div className="shore-div-btns">
              <label>
                <input type="radio" name="hazard" onChange={() => setH(true)} />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="hazard"
                  onChange={() => setH(false)}
                />
                No
              </label>
            </div>
          </div>

          <div className="shore-option">
            <div className="shore-div-title">
              <h2>Is it Offsite?</h2>
            </div>

            <div className="shore-div-btns">
              <label>
                <input
                  type="radio"
                  name="offsite"
                  onChange={() => setO(true)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="offsite"
                  onChange={() => setO(false)}
                />
                No
              </label>
            </div>
          </div>

          <div className="shore-option">
            <div className="shore-div-title">
              <h2>Have the Receptors Picked it up?</h2>
            </div>

            <div className="shore-div-btns">
              <label>
                <input
                  type="radio"
                  name="receptors"
                  onChange={() => setR(true)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="receptors"
                  onChange={() => setR(false)}
                />
                No
              </label>
            </div>
          </div>

          <div className="shore-option">
            <div className="shore-div-title">
              <h2>Any forms of exposure such as wind?</h2>
            </div>

            <div className="shore-div-btns">
              <label>
                <input
                  type="radio"
                  name="exposed"
                  onChange={() => setE(true)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="exposed"
                  onChange={() => setE(false)}
                />
                No
              </label>
            </div>
          </div>
        </div>

        {showInitialAdvice && showModal && (
          <div className="details-modal">
            <div className="modal-content risk-content">
              <h2>Initial Advice </h2>
              <ul className="advice-list">
                <li>Shelter in Place </li>
                <li>
                  {" "}
                  Stay indoors preferably in a room away from the wind and on an
                  upper floor.
                </li>
                <li>
                  Close all doors and windows and turn off air conditioning /
                  ventilation systems.
                </li>
                <li>
                  If instructed place damp towels cloths around doors and
                  windows.
                </li>
                <li>Monitor media / social media for updates.</li>
              </ul>
              <button onClick={handleClose}>Close</button>
            </div>
          </div>
        )}

        <button onClick={handleSubmit}>Submit</button>
      </div>
    );
  } else if (screen === 2) {
    return (
      <div className="evacuation-screen">
        <h2>Evacuation Needed</h2>
        <p>
          Follow the evacuation plan and guidelines provided by the authorities.
        </p>
      </div>
    );
  } else if (screen === 3) {
    return (
      <div className="no-action-screen">
        <h2>No further action needed</h2>
        <p>Based on the SHORE criteria, there is no risk to the community.</p>
      </div>
    );
  } else if (screen === 4) {
    return (
      <div className="shelter-checklist-screen">
        <h2>Shelter Checklist</h2>
        <form onSubmit={handleShelterChecklistSubmit}>
          <label>
            <input
              type="radio"
              name="shelter"
              onChange={() => setShelterPossible(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="shelter"
              onChange={() => setShelterPossible(false)}
            />
            No
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else if (screen === 5) {
    return (
      <div className="evaluation-screen">
        <h2>Evaluation</h2>
        <form onSubmit={handleEvaluationSubmit}>
          <label>
            <input
              type="radio"
              name="evaluation"
              onChange={() => setStillThreat(true)}
            />
            Still a threat
          </label>
          <label>
            <input
              type="radio"
              name="evaluation"
              onChange={() => setStillThreat(false)}
            />
            No longer a threat
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  } else if (screen === 6) {
    return (
      <div className="its-safe-screen">
        <h2>It's safe now</h2>
        <p>
          Based on the evaluation, the situation is now safe for the community.
        </p>
      </div>
    );
  }

  return null;
}

export default RiskEvaluation;
