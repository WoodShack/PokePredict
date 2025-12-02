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
    <div className="text-center bg-gradient-to-b from-yellow-100 to-yellow-200 min-h-screen">
      <Header />

      <div className="mt-10 px-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-red-600">
          Welcome to Poke Predict EX!
        </h1>

        <p className="mt-4 text-lg font-medium text-black">
          Your adventure begins now!
        </p>

        <div className="mt-12">
          <p className="text-lg font-semibold text-black">
            Create your character to start your adventure. Enter your
            trainer name and choose an avatar to personalize your journey!
          </p>

          <a href="/characterCreation">
            <button
              className="
                px-6 py-3 mt-6
                bg-yellow-300 border-2 border-black rounded-xl 
                shadow-[4px_4px_0_#000]
                font-bold text-black text-lg
                hover:bg-yellow-400 active:scale-95 transition
              "
            >
              Create Character
            </button>
          </a>
        </div>

        {name && (
          <div className="mt-10 p-4 bg-white border-4 border-black rounded-2xl inline-block">
            <h2 className="text-2xl font-extrabold text-blue-600">
              Current Character
            </h2>

            <p className="mt-3 text-lg text-black font-semibold">
              Name: <span className="text-red-600">{name}</span>
            </p>

            {avatar && (
              <img
                src={avatar}
                alt="Trainer Avatar"
                className="mx-auto mt-6 w-40 h-40 rounded-xl border-4 border-black shadow-[4px_4px_0_#000]"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
