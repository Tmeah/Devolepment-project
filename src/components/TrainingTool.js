import React, { useState, useEffect } from "react";
import RiskEvaluation from "./RiskEvaluation";
import "../styles/TrainingTool.css";

function TrainingTool() {
  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] = useState(null);

  useEffect(() => {
    // Fetch incidents from the API and set them in the state
    // Replace the URL with the actual API endpoint
    fetch("/api/incidents")
      .then((response) => response.json())
      .then((data) => setIncidents(data));
  }, []);

  function handleIncidentChange(event) {
    const incidentId = parseInt(event.target.value);
    const incident = incidents.find((incident) => incident.id === incidentId);
    setSelectedIncident(incident);
  }

  return (
    <div className="training-tool">
      <div className="incident-div">
        <h2>Select an incident</h2>
        <select onChange={handleIncidentChange}>
          <option value="">Select an incident</option>
          {incidents.map((incident) => (
            <option key={incident.id} value={incident.id}>
              {incident.chemical}
            </option>
          ))}
        </select>
      </div>
      {selectedIncident && <RiskEvaluation incident={selectedIncident} />}
    </div>
  );
}

export default TrainingTool;
