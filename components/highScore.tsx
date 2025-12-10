import { useEffect, useState } from "react";
import { getHighScores, HighScore } from "./localstorage";

export default function HighScores() {
  const [scores, setScores] = useState<HighScore[]>([]);

  useEffect(() => {
    const savedScores = getHighScores();
    setScores(savedScores);
  }, []);

  return (
    <div className="mt-4 mx-auto max-w-2xl">
      <div
        className="
          bg-yellow-100 border-4 border-black rounded-xl
           p-3 text-black
        "
      >
        <h2 className="text-center font-black text-lg mb-2 tracking-wide text-black">
          HIGH SCORES
        </h2>

        {scores.length === 0 ? (
          <p className="text-center font-bold text-gray-800">
            No high scores yet
          </p>
        ) : (
          <table className="w-full border-collapse font-bold text-sm text-black">
            <thead>
              <tr className="bg-yellow-300 border-2 border-black">
                <th className="p-1 border-2 border-black text-left">
                  PLAYER
                </th>
                <th className="p-1 border-2 border-black text-center">
                  SCORE
                </th>
                <th className="p-1 border-2 border-black text-right">
                  DATE
                </th>
              </tr>
            </thead>

            <tbody>
              {scores.map((score, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-yellow-200 border-2 border-black text-black"
                >
                  <td className="p-1 border-2 border-black text-left">
                    {score.name}
                  </td>
                  <td className="p-1 border-2 border-black text-center">
                    {score.score}
                  </td>
                  <td className="p-1 border-2 border-black text-right">
                    {score.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
