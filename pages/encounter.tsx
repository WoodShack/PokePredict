import Header from "../components/header";
import Encounter from "../components/encounter";
import { getCharacter } from "../components/localstorage";
import { useState, useEffect } from "react";

export default function EncounterPage() {
  const [character, setCharacter] = useState<{
    name: string;
    imageId: number;
  } | null>(null);

  useEffect(() => {
    const savedCharacter = getCharacter();
    if (savedCharacter) setCharacter(savedCharacter);
  }, []);

  return (
    <div>
      <Header />
      <Encounter />
    </div>
  );
}
