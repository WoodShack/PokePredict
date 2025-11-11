import { useEffect, useState } from 'react'
import PokemonCard from './pokemon'
import type { Pokemon } from './pokeapi'
import { getTwoRandomPokemon } from './pokeapi'
import styles from '../styles/encounter.module.css'

export default function Encounter() {
    const [pokemons, setPokemons] = useState<[Pokemon | null, Pokemon | null]>([null, null])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function load() {
        setLoading(true)
        setError(null)
        try {
            const [p1, p2] = await getTwoRandomPokemon()
            setPokemons([p1, p2])
        } catch (err: any) {
            setError(err?.message ?? 'Failed to load Pokémon')
            setPokemons([null, null])
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        load()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.button} onClick={load} disabled={loading}>
                    {loading ? 'Loading…' : 'New encounter'}
                </button>
            </div>

            {error ? <div className={styles.error}>{error}</div> : null}

            <div className={styles.cards}>
                {pokemons.map((p, i) =>
                    p ? (
                        <PokemonCard key={p.id} pokemon={p} />
                    ) : (
                        <div key={i} className={styles.placeholder}>
                            {loading ? 'Loading…' : 'No Pokémon'}
                        </div>
                    )
                )}
            </div>
        </div>
    )
}