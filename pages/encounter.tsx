import Header from "../components/header";
import Encounter from "../components/encounter";
import { getCharacter } from "../components/localstorage";
import { useState, useEffect } from "react";
import HighScores from "../components/highScore";

export default function EncounterPage() {
  const [character, setCharacter] = useState<{ name: string; imageId: number } | null>(null);

  useEffect(() => {
    const savedCharacter = getCharacter();
    if (savedCharacter) setCharacter(savedCharacter);
  }, []);

  return (
    <div>
      <Header/>

      {character && (
        <div>
          <h2>Current Character</h2>
          <p>Name: {character.name}</p>
          <img
            src={`/trainer${character.imageId}.png`}
            alt="Trainer Avatar"
          />
        </div>
      )}
      <Encounter/>
      <HighScores/>
    </div>
  );
}