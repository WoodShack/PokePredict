import Image from "next/image";
import { useRouter } from "next/router";

type LivesProps = {
  lives: number;
  totalLives?: number;
};

export default function Lives({ lives, totalLives = 5 }: LivesProps) {
  const { basePath } = useRouter();

  return (
    <div className="flex gap-1 justify-center mb-2">
      {Array.from({ length: totalLives }).map((_, i) => (
        <Image
          key={i}
          src={i < lives ? `${basePath}/heart-pixel-full.png` : `${basePath}/heart-pixel-empty.png`}
          alt=""
          width={25}
          height={25}
          className="w-6 h-6 image-rendering-pixelated"
        />
      ))}
    </div>
  );
}
