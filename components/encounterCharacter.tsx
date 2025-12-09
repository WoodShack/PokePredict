import { useState, useEffect } from "react";
import { getCharacter, Character } from "../components/localstorage";

export default function EncounterCharacter() {
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const savedCharacter = getCharacter();
    if (savedCharacter) setCharacter(savedCharacter);
  }, []);

  if (!character) return <p>No character created yet.</p>;

  const avatarSrc =
    character.imageId === 1
      ? "/avatar1.png"
      : character.imageId === 2
      ? "/avatar2.png"
      : "/avatar3.png";

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Your Character</h2>
      <p>Name: {character.name}</p>
      <img src={avatarSrc} alt="Trainer Avatar" style={{ display: "block", margin: "20px auto" }}/>
    </div>
  );
}