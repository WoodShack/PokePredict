import Image from "next/image";

export default function Header() {
  return (
    <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
      <Image src="logo.png" alt="Logo" width={180} height={180}/>
      <nav style={{ display: "flex", gap: "40px" }}>
        <button onClick={() => location.href = "/"}>Home</button>
        <button onClick={() => location.href = "/characterCreation"}>Character Creation</button>
        <button onClick={() => location.href = "/encounter"}>Encounter</button>
        <button onClick={() => location.href = "/trivia"}>Trivia</button>
      </nav>
    </header>
  );
}