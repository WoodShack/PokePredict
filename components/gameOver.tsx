import HighScores from "./highScore";

type GameOverProps = {
  onRestart: () => void;
};

export default function GameOver({ onRestart }: GameOverProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50 p-4">
      <div className="bg-yellow-500 border-4 border-black rounded-2xl p-6 text-center max-w-lg w-full">
        <h2 className="text-4xl font-extrabold text-red-600 mb-4 tracking-wider">
          GAME OVER!
        </h2>

        <div className="mb-6">
          <HighScores />
        </div>

        <button
          className="
            px-6 py-3 bg-red-500 border-2 border-black rounded-xl 
            font-bold text-black text-lg
            hover:bg-red-600 active:scale-95 transition
          "
          onClick={onRestart}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}
