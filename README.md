# Maze of Love 💖

## Overview

**Maze of Love** is a fun, interactive Valentine-themed application where users navigate a pixelated maze to reach a heart. Along the way, they answer cute and funny questions designed to create a delightful and chaotic experience. Once the game is completed, a series of explosive celebrations — including confetti and GIFs — take over the screen to express love in the most vibrant way possible.

---

## Features

- **Pixelated Maze**: Navigate using `W`, `A`, `S`, `D` or arrow keys.
- **Interactive Questions**: Engage with funny and personalized questions along the way.
- **Explosive Celebrations**:
  - Confetti (🎉)
  - Exploding GIFs (🐻💖)
- **Dynamic Animations**: Every element is randomly positioned and sized for a chaotic, love-filled experience.

---

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/freddysongg/maze-of-love.git
cd maze-of-love
```

### 2. Install Dependencies
Make sure you have Node.js installed. Then, run:
```bash
npm install
```

### 3. Modify `QuestionCard.tsx`
Make sure that you change the questions to make it personalized for your use case.

### 4. Run the App
Start the development server:
```bash
npm start
```
Visit `http://localhost:3000` in your browser to play the game.

---

## File Structure

- **`src/`**
  - **`components/`**
    - `Maze.tsx`: Main maze logic and celebrations.
    - `Player.tsx`: The player character (a pixelated corgi).
    - `Heart.tsx`: Represents the heart at the end of the maze.
    - `QuestionCard.tsx`: Handles interactive questions.
  - **`hooks/`**
    - `useGameState.ts`: Manages the game state, including player position and question flow.
  - **`utils/`**
    - `gameUtils.ts`: Utility functions, such as calculating distance.
- **`public/assets/`**
  - `g1.gif`, `g2.gif`, `g3.gif`, `g4.gif`: GIFs for explosive celebrations.

---

## Customization

### Adding More GIFs
1. Place new GIFs in the `public/assets/` folder.
2. Update the `gifUrls` array in `Maze.tsx` to include the new file paths.

### Adjusting Celebration Chaos
- **Exploding GIFs**: Modify the count in `generateRandomGifs` (default: 150).

---

## Controls

- **Move**: `W`, `A`, `S`, `D` or arrow keys.
- **Answer Questions**: Click buttons or type input in the text box.

---

## Dependencies

- **`react`**: For building the UI.
- **`react-confetti`**: For confetti effects.

---

## License

This project is open-source and available under the MIT License.

