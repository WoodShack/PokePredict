import { useEffect, useState } from "react";
import PokemonCard from "./pokemon";
import type { Pokemon } from "./pokeapi";
import { getTwoRandomPokemon } from "./pokeapi";
import { getCharacter, addHighScore } from "./localstorage";
import type { Character } from "./localstorage";
import { useRouter } from "next/router";
import Image from "next/image";
import Lives from "./lives";
import HighScores from "../components/highScore";
import GameOver from "./gameOver";

const correctSound =
  typeof Audio !== "undefined" ? new Audio("/sounds/correct.mp3.wav") : null;

const wrongSound =
  typeof Audio !== "undefined" ? new Audio("/sounds/wrong.mp3.wav") : null;

const gameOverSound =
  typeof Audio !== "undefined" ? new Audio("/sounds/gameover.mp3.wav") : null;

const questions: {
  text: string;
  attribute: "height" | "weight" | "attack" | "defense" | "hp";
}[] = [
  { text: "Which Pokémon is taller?", attribute: "height" },
  { text: "Which Pokémon weighs more?", attribute: "weight" },
  { text: "Which Pokémon has higher attack power?", attribute: "attack" },
  { text: "Which Pokémon has higher defense?", attribute: "defense" },
  { text: "Which Pokémon has more health?", attribute: "hp" },
];

export default function Encounter() {
  const [pokemons, setPokemons] = useState<[Pokemon | null, Pokemon | null]>([
    null,
    null,
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [question, setQuestion] = useState(questions[0]);

  const [character, setCharacter] = useState<Character | null>(null);
  const [lives, setLives] = useState(5);
  const [score, setScore] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(false);
  const { basePath } = useRouter();

  function getAvatarSrc(imageId: 1 | 2 | 3) {
    switch (imageId) {
      case 1:
        return `${basePath}/avatar1.png`;
      case 2:
        return `${basePath}/avatar2.png`;
      case 3:
        return `${basePath}/avatar3.png`;
    }
  }

  function handleSelectPokemon(id: number) {
    const [p1, p2] = pokemons;
    if (!p1 || !p2 || lives === 0) return;

    const selected = p1.id === id ? p1 : p2.id === id ? p2 : null;
    const other = selected === p1 ? p2 : p1;
    if (!selected || !other) return;

    const attr = question.attribute;
    const selectedVal = (selected as any)[attr] ?? 0;
    const otherVal = (other as any)[attr] ?? 0;

    const correct = selectedVal > otherVal;

    if (correct) {
      correctSound?.play();
      setScore((prev) => prev + 1);
      alert(
        `Correct! ${selected.name} has ${attr} of ${selectedVal}, while ${other.name} has ${attr} of ${otherVal}.`
      );
    } else {
      wrongSound?.play();
      setLives((prev) => Math.max(prev - 1, 0));
      alert(
        `Wrong! ${selected.name} has ${attr} of ${selectedVal}, while ${other.name} has ${attr} of ${otherVal}.`
      );
    }

    load();
  }

  async function load() {
    if (lives === 0) return;

    setLoading(true);
    setError(null);

    try {
      const [p1, p2] = await getTwoRandomPokemon();
      setPokemons([p1, p2]);

      const randomIndex = Math.floor(Math.random() * questions.length);
      setQuestion(questions[randomIndex]);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load Pokémon");
      setPokemons([null, null]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    const saved = getCharacter();
    if (saved) setCharacter(saved);
  }, []);

  useEffect(() => {
    if (lives === 0 && character && !scoreSaved) {
      gameOverSound?.play();
      addHighScore(character, score);
      setScoreSaved(true);
    }
  }, [lives, character, score, scoreSaved]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 p-6">
      <h1 className="text-4xl text-center mb-4 font-extrabold text-red-600">
        Pokemon Encounter
      </h1>

      {character && (
        <div className="flex justify-center mt-4 mb-6">
          <div
            className="
        bg-white border-4 border-black
        rounded-xl px-6 py-4
        flex flex-col items-center gap-3
      "
          >
            
            <Lives lives={lives} />

            <div className="text-sm text-black font-bold bg-yellow-200 border-2 border-black px-4 py-1 rounded">
              SCORE: {score}
            </div>

            <Image
              src={getAvatarSrc(character.imageId)}
              width={20}
              height={20}
              alt="Player Avatar"
              className="w-20 h-20 border-4 border-black bg-white rounded-md"
            />
          </div>
        </div>
      )}

      {error && (
        <div className="max-w-lg mx-auto mb-8 p-4 bg-red-300 border-2 border-black rounded-xl text-black font-bold shadow-[4px_4px_0_#000] text-center">
          {error}
        </div>
      )}

      <div className="flex items-center justify-center gap-15 max-w-5xl mx-auto">
        {pokemons.map((p, i) =>
          p ? (
            <PokemonCard
              key={p.id}
              pokemon={p}
              onSelect={handleSelectPokemon}
            />
          ) : (
            <div
              key={i}
              className="flex items-center justify-center h-40 bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0_#000] font-bold text-lg text-gray-700"
            >
              {loading ? "Loading…" : "No Pokémon"}
            </div>
          )
        )}
      </div>

      <div className="border border-gray-300 rounded-lg p-4 shadow-md bg-white mt-6 mx-auto max-w-md w-full">
        <h2 className="text-lg font-bold text-black text-center">
          {question.text}
        </h2>
      </div>

      <HighScores/>

      {lives === 0 && (
        <GameOver
          score={score}
          onRestart={() => {
            setLives(5);
            setScore(0);
            setScoreSaved(false);
            load();
          }}
        />
      )}
    </div>
  );
}
