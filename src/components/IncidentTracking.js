import React, { useState, useEffect, useCallback } from "react";
import "../styles/IncidentTracking.css";
import WeatherComponent from "./WeatherComponent";

function IncidentTracking() {
  const [incidents, setIncidents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [windInfo, setWindInfo] = useState({
    wind_speed: "",
    wind_direction: "",
  });

  const onWeatherData = useCallback((speed, direction) => {
    setWindInfo({ wind_speed: speed, wind_direction: direction });
  }, []);

  useEffect(() => {
    fetchIncidents();
  }, []);

  function fetchIncidents() {
    fetch("/api/incidents")
      .then((response) => response.json())
      .then((data) => setIncidents(data))
      .catch((error) => console.error("Error fetching incidents:", error));
  }
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const requestData = {
      chemical: data.get("chemical"),
      date: data.get("date"),
      location: data.get("location"),
      description: data.get("description"),
      action: data.get("action"),
      scale: data.get("scale"),
      duration: data.get("duration"),
      port_shore: data.get("port_shore"),
      wind_speed: windInfo.wind_speed,
      wind_direction: windInfo.wind_direction,
      weather: data.get("weather"),
    };

    fetch("/api/incidents", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIncidents([...incidents, data]);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function handleDetails(incident) {
    setModalData(incident);
    setShowModal(true);
  }

  function handleClose() {
    setShowModal(false);
  }

  return (
    <div className="incident-tracking">
      <h1>Enter Incidents Below</h1>
      <div style={{ display: "none" }}>
        <WeatherComponent onWeatherData={onWeatherData} />
      </div>

      <form onSubmit={handleSubmit}>
        <label htmlFor="chemical">Chemical:</label>
        <input type="text" id="chemical" name="chemical" required />

        <label htmlFor="date">Date:</label>
        <input type="date" id="date" name="date" required />
        <label htmlFor="scale">Scale:</label>
        <select id="scale" name="scale" required>
          <option value="small">Small / Medium (Cylinders)</option>
          <option value="large">Large (ISO / Road Tank)</option>
          <option value="v_large">V. Large (Ship / Shore)</option>
        </select>

        <label htmlFor="duration">Duration (hours):</label>
        <input type="number" id="duration" name="duration" />

        <label htmlFor="port_shore">Port / Shore:</label>
        <select id="port_shore" name="port_shore" required>
          <option value="port">Port</option>
          <option value="shore">Shore</option>
        </select>

        <label htmlFor="wind_speed">Wind Speed:</label>
        <input
          type="text"
          id="wind_speed"
          name="wind_speed"
          value={`${windInfo.wind_speed} m/s`}
          readOnly
        />

        <label htmlFor="wind_direction">Wind Direction:</label>
        <input
          type="text"
          id="wind_direction"
          name="wind_direction"
          value={`${windInfo.wind_direction}°`}
          readOnly
        />

        <label htmlFor="weather">Weather:</label>
        <select id="weather" name="weather" required>
          <option value="dry">Dry</option>
          <option value="wet">Wet</option>
        </select>

        <label htmlFor="location">Location:</label>
        <input type="text" id="location" name="location" required />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" required />

        <label htmlFor="action">Action Taken:</label>
        <textarea id="action" name="action" required />

        <input type="submit" value="Submit" />
      </form>
      <table>
        <thead>
          <tr>
            <th>Incident ID</th>
            <th>Chemical</th>
            <th>Quantity</th>
            <th>Date</th>
            <th>Location</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => (
            <tr key={incident.id}>
              <td>{incident.id}</td>
              <td>{incident.chemical}</td>
              <td>{incident.scale}</td>
              <td>{incident.date}</td>
              <td>{incident.location}</td>
              <td>
                <button onClick={() => handleDetails(incident)}>Details</button>
                <button
                  onClick={() => handleDetails(incident)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <div className="details-modal">
          <div className="modal-content">
            <h2>Incident Details</h2>
            <p>Incident ID: {modalData.id}</p>
            <p>Chemical: {modalData.chemical}</p>
            <p>Date: {modalData.date}</p>
            <p>Location: {modalData.location}</p>
            <p>Description: {modalData.description}</p>
            <p>Action Taken: {modalData.action}</p>
            <p>Scale: {modalData.scale}</p>
            <p>Duration: {modalData.duration}hr</p>
            <p>Port / Shore: {modalData.port_shore}</p>
            <p>Wind Speed: {modalData.wind_speed} m/s</p>
            <p>Wind Direction: {modalData.wind_direction}°</p>
            <p>Weather: {modalData.weather}</p>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default IncidentTracking;
