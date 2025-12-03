# PokePredict EX

## 🎮 Project Description

PokePredict EX is an interactive Pokémon-themed browser game designed to make short periods of downtime more fun and engaging. Whether you're waiting for the bus, on a break, or just have a few minutes to spare, this game provides a free, ad‑free, and download‑free way to pass the time.

In the game, you take on the role of a Pokémon trainer walking through tall grass. During an **“encounter,”** two random Pokémon appear, and you must answer questions comparing their stats:

- Which Pokémon is taller?
- Which Pokémon weighs more?
- Which Pokémon has higher attack power?
- Which Pokémon has higher defence?
- Which Pokémon has more health?

You start with **5 health points**. Each incorrect answer costs 1 health point, while each correct answer increases your score by 1. The goal is to achieve the highest score possible and compete with friends. Your trainer’s name, chosen character image, and high scores are saved locally on your device—no account or installation required.

## 📁 Component Overview

### `header.tsx` – Navigation Header
The top navigation bar of the website. Displays the logo, a Pokéball icon, and two styled tabs (“Home” and “Character Creation”) that look like buttons from a Pokédex.

### `pokemon.tsx` – Pokémon Display Card
Shows a single Pokémon with its image and name. Includes a “Select” button that allows the player to choose that Pokémon during an encounter.

### `localstorage.ts` – Save Data Manager
Handles saving and loading game data in the browser’s local storage. Manages the player’s character (name and image choice) and high scores (name, score, date).

### `pokeapi.ts` – Pokémon Data Fetcher
Fetches random Pokémon data from the official Pokémon API. Retrieves stats (height, weight, attack, defense, HP) and images, ensuring each encounter shows two distinct, valid Pokémon.

### `encounter.tsx` – Game Screen
The main gameplay screen. Displays two random Pokémon, a random comparison question, and processes the player’s selection, providing feedback and loading new encounters.

### `characterCreation.tsx` – Character Setup Page
A page that combines the header with the character creation form, allowing players to name their trainer and select a character image before playing.

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install