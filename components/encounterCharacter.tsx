import { useState, useEffect } from "react";
import { getCharacter, Character } from "../components/localstorage";
import Image from "next/image";
import { useRouter } from "next/router";

export default function EncounterCharacter() {
  const [character, setCharacter] = useState<Character | null>(null);
  const { basePath } = useRouter();

  useEffect(() => {
    const savedCharacter = getCharacter();
    if (savedCharacter) setCharacter(savedCharacter);
  }, []);

  if (!character) return <p>No character created yet.</p>;

  const avatarSrc =
    character.imageId === 1
      ? `${basePath}/avatar1.png`
      : character.imageId === 2
      ? `${basePath}/avatar2.png`
      : `${basePath}/avatar3.png`;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Your Character</h2>
      <p>Name: {character.name}</p>
      <img src={avatarSrc} alt="Trainer Avatar" style={{ display: "block", margin: "20px auto" }}/>
    </div>
  );
}