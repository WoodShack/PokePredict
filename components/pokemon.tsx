import type { Pokemon } from './pokeapi'
import styles from '../styles/pokemon.module.css'

type Props = {
    pokemon: Pokemon
}

export default function PokemonCard({ pokemon }: Props) {
    const img = pokemon.sprites?.front_default ?? ''
    const displayName = pokemon.name ? pokemon.name.replace(/-/g, ' ') : 'Unknown'

    return (
        <div className={styles.card}>
            {img ? (
                <img
                    src={img}
                    alt={displayName}
                    className={styles.image}
                />
            ) : (
                <div className={styles.placeholder}>
                    No image
                </div>
            )}

            <h3 className={styles.name}>{displayName}</h3>

            <div className={styles.stats}>
                HP: {pokemon.hp} • ATK: {pokemon.attack} • DEF: {pokemon.defense}
            </div>

            <div className={styles.meta}>
                Height: {pokemon.height} • Weight: {pokemon.weight}
            </div>
        </div>
    )
}