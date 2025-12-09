type LivesProps = {
  lives: number;
  totalLives?: number;
};

export default function Lives({ lives, totalLives = 5 }: LivesProps) {
  return (
    <div className="flex gap-1 justify-center mb-2">
      {Array.from({ length: totalLives }).map((_, i) => (
        <img
          key={i}
          src={i < lives ? "/heart-pixel-full.png" : "/heart-pixel-empty.png"}
          alt=""
          className="w-6 h-6 image-rendering-pixelated"
        />
      ))}
    </div>
  );
}
