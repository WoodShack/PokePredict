import Header from "../components/header";
import { useState } from "react";
import { useRouter } from "next/router";
import { saveCharacter } from "../components/localstorage";

export default function CharacterCreation() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedAvatar = (
      document.querySelector('input[name="avatar"]:checked') as HTMLInputElement
    )?.value;

    if (name && selectedAvatar) {
      const avatarNum = parseInt(selectedAvatar) as 1 | 2 | 3;
      saveCharacter({ name, imageId: avatarNum });
      router.push("/encounter");
    }
  };

  return (
    <div className="text-center bg-gradient-to-b from-yellow-100 to-yellow-200 min-h-screen pb-20">
      <Header />

      <h1 className="mt-10 text-4xl font-extrabold text-red-600 ">
        Create Your Character
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 max-w-xl mx-auto bg-white border-4 border-black rounded-2xl shadow-[6px_6px_0_#000] p-8"
      >
        <div className="mb-8">
          <label className="block text-lg text-black font-bold mb-2">
            Trainer Name:
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="
          w-full px-4 py-2 
          border-2 border-black 
          text-black
          rounded-lg 
          shadow-[3px_3px_0_#000]
          focus:outline-none
          focus:ring-2 focus:ring-red-500
        "
          />
        </div>

        <p className="text-lg text-black font-bold mb-4">Select an avatar:</p>

        <div className="flex justify-center gap-6">
          <label
            className="
          cursor-pointer p-3 
          bg-yellow-200 border-2 border-black rounded-xl
          shadow-[4px_4px_0_#000]
          hover:bg-yellow-300 transition active:scale-95
        "
          >
            <input
              type="radio"
              name="avatar"
              value="1"
              required
              className="mb-2"
            />
            <img
              src="/avatar1.png"
              alt="Trainer 1"
              width={100}
              className="rounded-lg text-black border-2 border-black"
            />
          </label>

          <label
            className="
          cursor-pointer p-3 
          bg-yellow-200 border-2 border-black rounded-xl
          shadow-[4px_4px_0_#000]
          hover:bg-yellow-300 transition active:scale-95
        "
          >
            <input
              type="radio"
              name="avatar"
              value="2"
              required
              className="mb-2"
            />
            <img
              src="/avatar2.png"
              alt="Trainer 2"
              width={100}
              className="rounded-lg text-black border-2 border-black"
            />
          </label>

          <label
            className="
          cursor-pointer p-3 
          bg-yellow-200 border-2 border-black rounded-xl
          shadow-[4px_4px_0_#000]
          hover:bg-yellow-300 transition active:scale-95
        "
          >
            <input
              type="radio"
              name="avatar"
              value="3"
              required
              className="mb-2"
            />
            <img
              src="/avatar3.png"
              alt="Trainer 3"
              width={100}
              className="rounded-lg text-black border-2 border-black"
            />
          </label>
        </div>

        <button
          type="submit"
          className="
        mt-10 px-6 py-3
        bg-yellow-300 border-2 border-black rounded-xl 
        shadow-[4px_4px_0_#000] 
        font-bold text-black text-lg
        hover:bg-yellow-400 active:scale-95 transition
        block mx-auto
      "
        >
          Save Character
        </button>
      </form>
    </div>
  );
}