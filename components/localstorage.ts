export type Character = {
    name: string
    imageId: 1 | 2 | 3
}

export type HighScore = {
    name: string
    score: number
    date: string
}

const CHARACTER_KEY = 'pokepredict_character'
const HIGHSCORES_KEY = 'pokepredict_highscores'

//Save character to localStorage
export function saveCharacter(character: Character): void {
    try {
        localStorage.setItem(CHARACTER_KEY, JSON.stringify(character))
    } catch (err) {
        console.error('Failed to save character:', err)
    }
}


//Get character from localStorage
export function getCharacter(): Character | null {
    try {
        const data = localStorage.getItem(CHARACTER_KEY)
        return data ? JSON.parse(data) : null
    } catch (err) {
        console.error('Failed to get character:', err)
        return null
    }
}

//Clear character from localStorage
export function clearCharacter(): void {
    try {
        localStorage.removeItem(CHARACTER_KEY)
    } catch (err) {
        console.error('Failed to clear character:', err)
    }
}


//Add a high score
export function addHighScore(character: Character, score: number): void {
    try {
        const scores = getHighScores()
        const newScore: HighScore = {
            name: character.name,
            score,
            date: new Date().toISOString()
        }
        scores.push(newScore)
        scores.sort((a, b) => b.score - a.score)
        localStorage.setItem(HIGHSCORES_KEY, JSON.stringify(scores))
    } catch (err) {
        console.error('Failed to add high score:', err)
    }
}

//Get all high scores, sorted highest to lowest
export function getHighScores(): HighScore[] {
    try {
        const data = localStorage.getItem(HIGHSCORES_KEY)
        return data ? JSON.parse(data) : []
    } catch (err) {
        console.error('Failed to get high scores:', err)
        return []
    }
}

//Clear all high scores
export function clearHighScores(): void {
    try {
        localStorage.removeItem(HIGHSCORES_KEY)
    } catch (err) {
        console.error('Failed to clear high scores:', err)
    }
}