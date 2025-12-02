import type { Pokemon } from "./pokeapi";
import styles from "../styles/pokemon.module.css";

type Props = {
  pokemon: Pokemon;
  onSelect: (id: number) => void;
};

export default function PokemonCard({ pokemon, onSelect }: Props) {
  const img = pokemon.sprites?.front_default ?? "";
  const displayName = pokemon.name
    ? pokemon.name.replace(/-/g, " ")
    : "Unknown";

  return (
    <div className={styles.card}>
      {img ? (
        <img src={img} alt={displayName} className={styles.image} />
      ) : (
        <div className={styles.placeholder}>No image</div>
      )}

      <h3 className={styles.name}>{displayName}</h3>

      <button
        type="button"
        onClick={() => onSelect(pokemon.id)}
        className="
          relative 
          px-5 py-2 
          font-bold 
          text-black 
          bg-yellow-300 
          border-2 border-black 
          shadow-[3px_3px_0_#000]
          transition active:scale-95
          hover:bg-yellow-400
          rounded-lg"
      >
        Select
      </button>
    </div>
  );
}