import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import ChemicalDatabase from "./components/ChemicalDatabase";
import IncidentTracking from "./components/IncidentTracking";
import TrainingTool from "./components/TrainingTool";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import WeatherComponent from "./components/WeatherComponent";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/weather-container" element={<WeatherComponent />} />
        <Route path="/chemical-database" element={<ChemicalDatabase />} />
        <Route path="/incident-tracking" element={<IncidentTracking />} />
        <Route path="/training-tool" element={<TrainingTool />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
