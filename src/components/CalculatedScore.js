import React from "react";
import "../styles/CalculatedScore.css";

function CalculatedScore({ answers }) {
  const totalScore = answers.reduce(
    (total, answer) => total + answer.points,
    0
  );
  return (
    <div className="calculated-score">
      <h2>Your Total Score: {totalScore}</h2>
    </div>
  );
}

export default CalculatedScore;
