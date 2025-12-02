let allPokemon: { name: string; url: string }[] = [];

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

async function loadAllPokemon() {
  if (allPokemon.length > 0) return allPokemon; // already loaded

  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=2000");
  const data = await res.json();

  allPokemon = data.results; // save results
  return allPokemon;
}

// Returns a random pokemon URL
async function getRandomPokemonURL(): Promise<string> {
    await loadAllPokemon(); // Ensure allPokemon is loaded
    const randomIndex = Math.floor(Math.random() * allPokemon.length);
    return allPokemon[randomIndex].url;
}

// Fetch data for a pokemon using its ID
async function fetchPokemon(url: string): Promise<Pokemon> {
    console.log(url)
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch Pokémon ${url}: ${res.status}`)
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
    let pokemon1: Pokemon | null = null;
    let pokemon2: Pokemon | null = null;

    // Get a valid first pokemon with a sprite
    while (pokemon1 === null) {
        try {
            let pokemon1URL = await getRandomPokemonURL();
            const candidate = await fetchPokemon(pokemon1URL);

            // Make sure it has an image
            if (candidate.sprites?.front_default != null) {
                pokemon1 = candidate;
            }
        } catch (err) {
            console.log("Error fetching pokemon 1, retrying...");
        }
    }

    // Get a valid second pokemon that is different from the first and has a sprite
    while (pokemon2 === null) {
        let pokemon2URL = await getRandomPokemonURL();
        while (pokemon2URL === "https://pokeapi.co/api/v2/pokemon/" + pokemon1.id + "/") {
            pokemon2URL = await getRandomPokemonURL();
        }

        try {
            const candidate = await fetchPokemon(pokemon2URL);
            
            // Make sure it has an image
            if (candidate.sprites?.front_default != null) {
                pokemon2 = candidate;
            }
        } catch (err) {
            console.log("Error fetching pokemon 2, retrying...");
        }
    }

    return [pokemon1, pokemon2];
}