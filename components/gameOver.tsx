import HighScores from "./highScore";

type GameOverProps = {
  score: number;
  onRestart: () => void;
};

export default function GameOver({ score, onRestart }: GameOverProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-yellow-500 border-4 border-black rounded-3xl p-8 text-center max-w-lg w-full shadow-2xl">
        <h2 className="text-5xl font-extrabold text-red-600 mb-6 drop-shadow-[2px_2px_0px_black] tracking-wide">
          GAME OVER!
        </h2>

        <div className="w-24 h-1 bg-black mx-auto mb-6 rounded-full"></div>

        <div className="mb-8">
          <HighScores />
        </div>

        <button
          onClick={onRestart}
          className="px-7 py-3 bg-red-500 border-2 border-black rounded-xl 
                     font-bold text-black text-lg
                     hover:bg-red-600 active:scale-95 active:shadow-none transition-all"
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}
