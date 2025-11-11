export type Pokemon = {
    id: number
    name: string
    height: number
    weight: number
    attack: number
    defense: number
    hp: number
    sprites?: {
        front_default?: string | null
        [key: string]: any
    }
    [key: string]: any
}

// Returns a random pokemon ID
function getRandomPokemonId(): number {
    const highestPokemonID = 1327;
    return Math.floor(Math.random() * highestPokemonID) + 1
}

// Fetch data for a pokemon using its ID
async function fetchPokemonById(id: number): Promise<Pokemon> {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if (!res.ok) throw new Error(`Failed to fetch Pokémon ${id}: ${res.status}`)
    const json = await res.json()

    const statMap: Record<string, number> = {}
    if (Array.isArray(json.stats)) {
        for (const s of json.stats) {
            if (s?.stat?.name && typeof s.base_stat === 'number') {
                statMap[s.stat.name] = s.base_stat
            }
        }
    }

    return {
        id: json.id,
        name: json.name,
        height: typeof json.height === 'number' ? json.height : 0,
        weight: typeof json.weight === 'number' ? json.weight : 0,
        attack: statMap['attack'] ?? 0,
        defense: statMap['defense'] ?? 0,
        hp: statMap['hp'] ?? 0,
        sprites: json.sprites,
        ...json
    } as Pokemon
}

// Get two random pokemon
export async function getTwoRandomPokemon(): Promise<[Pokemon, Pokemon]> {
    let pokemon1 = null;
    let pokemon2 = null;

    //Get a valid first pokemon
    while(pokemon1 === null){
        try{
            pokemon1 = await fetchPokemonById(getRandomPokemonId());
        } catch(err){

        }
    }

    //Get a valid second pokemon that is different from the first
    while(pokemon2 === null){
        let pokemon2ID = getRandomPokemonId();
        while(pokemon2ID === pokemon1.id){
            pokemon2ID = getRandomPokemonId();
        }

        try{
            pokemon2 = await fetchPokemonById(pokemon2ID);
        } catch(err){

        }
    }

    return [pokemon1, pokemon2]
}