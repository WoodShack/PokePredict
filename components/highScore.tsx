import { useEffect, useState, useCallback } from "react";
import { getHighScores, HighScore } from "./localstorage";

type Props = {
  reloadTrigger?: number;
};

export default function HighScores({ reloadTrigger }: Props) {
  const [scores, setScores] = useState<HighScore[]>([]);

  const reloadScores = useCallback(() => {
    setScores(getHighScores());
  }, []);

  useEffect(() => {
    reloadScores();

    function onStorage(e: StorageEvent) {
      if (!e.key || e.key === "pokepredict_highscores") {
        reloadScores();
      }
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [reloadScores]);

  useEffect(() => {
    if (typeof reloadTrigger !== "undefined") {
      reloadScores();
    }
  }, [reloadTrigger, reloadScores]);

  return (
    <div className="mt-4 mx-auto max-w-2xl">
      <div className="bg-yellow-100 border-4 border-black rounded-xl p-3 text-black">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-center font-black text-lg tracking-wide text-black">
            HIGH SCORES
          </h2>
        </div>

        {scores.length === 0 ? (
          <p className="text-center font-bold text-gray-800">No high scores yet</p>
        ) : (
          <table className="w-full border-collapse font-bold text-sm text-black">
            <thead>
              <tr className="bg-yellow-300 border-2 border-black">
                <th className="p-1 border-2 border-black text-left">PLAYER</th>
                <th className="p-1 border-2 border-black text-center">SCORE</th>
                <th className="p-1 border-2 border-black text-right">DATE</th>
              </tr>
            </thead>

            <tbody>
              {scores.map((score, index) => (
                <tr
                  key={index}
                  className="odd:bg-white even:bg-yellow-200 border-2 border-black text-black"
                >
                  <td className="p-1 border-2 border-black text-left">{score.name}</td>
                  <td className="p-1 border-2 border-black text-center">{score.score}</td>
                  <td className="p-1 border-2 border-black text-right">{score.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}