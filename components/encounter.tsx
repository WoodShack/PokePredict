import { useEffect, useState } from "react";
import PokemonCard from "./pokemon";
import type { Pokemon } from "./pokeapi";
import { getTwoRandomPokemon } from "./pokeapi";

const questions: { text: string; attribute: 'height' | 'weight' | 'attack' | 'defense' | 'hp' }[] = [
  { text: 'Which Pokémon is taller?', attribute: 'height' },
  { text: 'Which Pokémon weighs more?', attribute: 'weight' },
  { text: 'Which Pokémon has higher attack power?', attribute: 'attack' },
  { text: 'Which Pokémon has higher defense?', attribute: 'defense' },
  { text: 'Which Pokémon has more health?', attribute: 'hp' },
];

export default function Encounter() {
    const [pokemons, setPokemons] = useState<[Pokemon | null, Pokemon | null]>([null, null]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [question, setQuestion] = useState(questions[0]);

    function handleSelectPokemon(id: number) {
       const [p1, p2] = pokemons;
       if (!p1 || !p2) return;

       const selected = p1.id === id ? p1 : p2.id === id ? p2 : null;
       const other = selected === p1 ? p2 : p1;
       if (!selected || !other) return;

       const attr = question.attribute;
       const selectedVal = (selected as any)[attr] ?? 0;
       const otherVal = (other as any)[attr] ?? 0;

       const correct = selectedVal > otherVal;
       if(correct){
           alert(`Correct! ${selected.name} has ${attr} of ${selectedVal}, while ${other.name} has ${attr} of ${otherVal}.`);
       } else {
           alert(`Wrong! ${selected.name} has ${attr} of ${selectedVal}, while ${other.name} has ${attr} of ${otherVal}.`);
       }

      load();
    }

    async function load() {
        setLoading(true);
        setError(null);
        try {
            const [p1, p2] = await getTwoRandomPokemon();
            setPokemons([p1, p2]);
            // Set a new random question
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
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-200 p-6">
            <h1 className="text-4xl text-center mb-6 font-extrabold text-red-600">
                Pokemon Encounter
            </h1>

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
                        <PokemonCard key={p.id} pokemon={p} onSelect={handleSelectPokemon} />
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

            <div id="encounter-question" className="border border-gray-300 rounded-lg p-4 shadow-md bg-white mt-6 mx-auto max-w-md w-full">
                <h2 className="text-lg font-bold text-black">{question.text}</h2>
            </div>
        </div>
    );
}