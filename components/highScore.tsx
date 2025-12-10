import { useEffect, useState } from "react";
import { getHighScores, HighScore } from "./localstorage";

export default function HighScores() {
  const [scores, setScores] = useState<HighScore[]>([]);

  useEffect(() => {
    const savedScores = getHighScores();
    setScores(savedScores);
  }, []);

  return (
    <div>
      <h2>High Scores</h2>
      {scores.length === 0 ? (
        <p>No high scores yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Player</th>
              <th>Score</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={index}>
                <td>{score.name}</td>
                <td>{score.score}</td>
                <td>{score.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
