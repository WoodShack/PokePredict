import { useEffect, useState } from "react";
import PokemonCard from "./pokemon";
import type { Pokemon } from "./pokeapi";
import { getTwoRandomPokemon } from "./pokeapi";
import styles from "../styles/encounter.module.css";

export default function Encounter() {
  const [pokemons, setPokemons] = useState<[Pokemon | null, Pokemon | null]>([
    null,
    null,
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const [p1, p2] = await getTwoRandomPokemon();
      setPokemons([p1, p2]);
    } catch (err: any) {
      setError(err?.message ?? "Failed to load Pokémon");
      setPokemons([null, null]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 p-6">
      <h1 className="text-4xl text-center mb-6 font-extrabold text-red-600">
        Pokemon Encounter
      </h1>

      <div className="flex justify-center mb-8">
        <button
          onClick={load}
          disabled={loading}
          className="
            px-6 py-3 
            bg-yellow-300 
            border-2 border-black 
            rounded-xl 
            shadow-[4px_4px_0_#000] 
            font-bold 
            text-black 
            text-lg
            hover:bg-yellow-400 
            active:scale-95 
            transition
            disabled:opacity-60 disabled:cursor-not-allowed
          "
        >
          {loading ? "Loading…" : "New Encounter"}
        </button>
      </div>

      {error && (
        <div
          className="
            max-w-lg mx-auto 
            mb-8 p-4 
            bg-red-300 
            border-2 border-black 
            rounded-xl 
            text-black font-bold 
            shadow-[4px_4px_0_#000] 
            text-center
          "
        >
          {error}
        </div>
      )}

      <div
        className="
          flex
          items-center
          justify-center
          gap-15
          max-w-5xl 
          mx-auto
        "
      >
        {pokemons.map((p, i) =>
          p ? (
            <PokemonCard key={p.id} pokemon={p} />
          ) : (
            <div
              key={i}
              className="
                flex items-center justify-center 
                h-40 
                bg-white 
                border-4 border-black 
                rounded-2xl 
                shadow-[6px_6px_0_#000] 
                font-bold text-lg text-gray-700
              "
            >
              {loading ? "Loading…" : "No Pokémon"}
            </div>
          )
        )}
      </div>
    </div>
  );
}
