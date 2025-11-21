import Header from "../components/header";
import { useState } from "react";

export default function CharacterCreation() {
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAvatar = (document.querySelector(
      'input[name="avatar"]:checked'
    ) as HTMLInputElement)?.value;

    if (name && selectedAvatar) {
      localStorage.setItem("playerName", name);
      localStorage.setItem("playerAvatar", selectedAvatar);
      alert("Character saved!");
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Header/>

      <h1>Create Your Character</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Trainer Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </label>
        </div>

        <p>Select an avatar:</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
          <label>
            <input type="radio" name="avatar" value="/avatar1.png" required />
            <img src="/avatar1.png" alt="Trainer 1" width={100} />
          </label>

          <label>
            <input type="radio" name="avatar" value="/avatar2.png" required />
            <img src="/avatar2.png" alt="Trainer 2" width={100} />
          </label>

          <label>
            <input type="radio" name="avatar" value="/avatar3.png" required />
            <img src="/avatar3.png" alt="Trainer 3" width={100} />
          </label>
        </div>

        <button type="submit" style={{ display: "block", margin: "20px auto" }}>
          Save Character
        </button>
      </form>
    </div>
  );
}