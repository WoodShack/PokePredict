import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 border-b-4 border-black shadow-[0_4px_0_0_#000]">
      <div className="flex items-center gap-4">
        <Image
          src="/logo.png"
          alt="Logo"
          width={140}
          height={140}
          className="drop-shadow-lg"
        />
        <Image
          src="/pokeball.png"
          alt="Pokeball"
          width={50}
          height={50}
          className="drop-shadow-md"
        />
      </div>

      <nav className="flex gap-4">
        <PokedexTab label="Home" href="/" />
        <PokedexTab label="Character Creation" href="/characterCreation" />
        <PokedexTab label="Encounter" href="/encounter" />
        <PokedexTab label="Trivia" href="/trivia" />
      </nav>
    </header>
  );
}

function PokedexTab({ label, href }) {
  return (
    <button
      onClick={() => (location.href = href)}
      className="
        relative 
        px-5 py-2 
        font-bold 
        text-black 
        bg-yellow-300 
        border-2 border-black 
        shadow-[3px_3px_0_#000]
        transition active:scale-95
        hover:bg-yellow-400
        rounded-lg
        before:content-[''] before:-left-2 before:top-0 before:w-2 before:h-full before:bg-yellow-300 before:border-t-2 before:border-b-2 before:border-black before:rounded-l-md
        after:content-[''] after:-right-2 after:top-0 after:w-2 after:h-full after:bg-yellow-300 after:border-t-2 after:border-b-2 after:border-black after:rounded-r-md
      "
    >
      {label}
    </button>
  );
}
