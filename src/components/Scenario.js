import React, { useState } from "react";
import "../styles/Scenario.css";
import { scenarios } from "./data.js";

function Scenario({ scenario, handleAnswer }) {
  const [answers, setAnswers] = useState([]);
  const currentScenario = scenarios.find((s) => s.id === scenario);

  function handleOptionClick(optionId) {
    const option = currentScenario.options.find((o) => o.id === optionId);
    const answer = {
      id: currentScenario.id,
      optionId,
      points: option.points,
    };
    setAnswers([...answers, answer]);
    handleAnswer(answer);
  }

  return (
    <div className="scenario">
      <h2>{currentScenario.question}</h2>
      <div className="options">
        {currentScenario.options.map((o) => (
          <button
            key={o.id}
            onClick={() => handleOptionClick(o.id)}
            className={`option ${
              answers.find((a) => a.optionId === o.id) ? "selected" : ""
            }`}
          >
            {o.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Scenario;
