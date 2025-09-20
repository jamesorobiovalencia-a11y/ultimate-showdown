import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./App.css";

const choices = [
  { id: "red", label: "Red", emoji: "🔴" },
  { id: "green", label: "Green", emoji: "🟢" },
  { id: "blue", label: "Blue", emoji: "🔵" },
];

const rules = {
  red: "green",   // Red beats Green
  green: "blue",  // Green beats Blue
  blue: "red",    // Blue beats Red
};

function App() {
  const [player1Choice, setPlayer1Choice] = useState(null);
  const [player2Choice, setPlayer2Choice] = useState(null);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);

  const getRandomChoice = () => {
    return choices[Math.floor(Math.random() * choices.length)];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const p1 = getRandomChoice();
      const p2 = getRandomChoice();
      setPlayer1Choice(p1);
      setPlayer2Choice(p2);

      if (rules[p1.id] === p2.id) {
        setPlayer1Score((prev) => prev + 10);
      } else if (rules[p2.id] === p1.id) {
        setPlayer2Score((prev) => prev + 10);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="game-container">
      <h1 className="game-title">🔥 Ultimate Showdown 🔥</h1>
      <div className="rules">
        <p>🔴 Red beats Green</p>
        <p>🟢 Green beats Blue</p>
        <p>🔵 Blue beats Red</p>
      </div>
      <div className="scoreboard">
        <div className="score">
          <img src="/doge.png" alt="Doge" className="avatar" />
          <h2>{player1Score}</h2>
        </div>
        <div className="score">
          <img src="/pepe.png" alt="Pepe" className="avatar" />
          <h2>{player2Score}</h2>
        </div>
      </div>
      <div className="choices">
        <motion.div
          key={player1Choice?.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="choice"
        >
          {player1Choice?.emoji}
        </motion.div>
        <motion.div
          key={player2Choice?.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="choice"
        >
          {player2Choice?.emoji}
        </motion.div>
      </div>
    </div>
  );
}

export default App;
