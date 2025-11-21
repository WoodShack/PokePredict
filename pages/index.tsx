import Header from "../components/header";
import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("playerName");
    const savedAvatar = localStorage.getItem("playerAvatar");
    if (savedName) setName(savedName);
    if (savedAvatar) setAvatar(savedAvatar);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Header/>
      <br></br>
      <h1>Welcome to Poke Predict EX!</h1>
      <p></p>

      <br></br>
      <p>Step 1: Create your character to start your adventure. Enter your trainer name and choose an avatar to personalize your journey!</p>
      <a href="/characterCreation">
        <button style={{ display: "block", margin: "20px auto" }}>
          Create Character
        </button>
      </a>

      <p>Step 2: Play games to test your skills! Try the Encounter game to battle wild Pokémon, and later challenge yourself with the Trivia game!</p>
      <a href="/encounter">
        <button style={{ display: "block", margin: "20px auto" }}>
          Start Encounter Game
        </button>
      </a>

      {name && (
        <div style={{ marginTop: "40px" }}>
          <h2>Current Character:</h2>
          <p>Name: {name}</p>
          {avatar && (
            <img
              src={avatar}
              alt="Trainer Avatar"
              style={{ display: "block", margin: "20px auto" }}
            />
          )}
        </div>
      )}
    </div>
  );
}
