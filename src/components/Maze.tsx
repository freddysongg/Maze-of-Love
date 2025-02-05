import React, { useState, useEffect, useRef } from 'react';
import Confetti from 'react-confetti';
import { useGameState } from '../hooks/useGameState';
import Player from './Player';
import Heart from './Heart';
import QuestionCard from './QuestionCard';
import { calculateDistance } from '../utils/gameUtils';

const mazeLayout = [
  '################',
  '#P             #',
  '# ############ #',
  '#            # #',
  '# ########## # #',
  '#          # # #',
  '# ######## # # #',
  '#        # # # #',
  '# ###### # # # #',
  '#      # # # # #',
  '# #### # # # # #',
  '#    # # # # # #',
  '#### # # # # # #',
  '#    # #   #   #',
  '# #### ####### #',
  '#            H #',
  '############## #'
];

const gifUrls = ['/assets/g1.gif', '/assets/g2.gif', '/assets/g3.gif', '/assets/g4.gif'];

const generateRandomGifs = (count: number) => {
  return Array.from({ length: count }).map(() => {
    const randomGif = gifUrls[Math.floor(Math.random() * gifUrls.length)];
    const randomX = Math.random() * 100;
    const randomY = Math.random() * 100;
    const randomSize = Math.random() * 70 + 50;
    const randomRotation = Math.random() * 360;

    return {
      gif: randomGif,
      x: randomX,
      y: randomY,
      size: randomSize,
      rotation: randomRotation
    };
  });
};

const Maze: React.FC = () => {
  const {
    playerPosition,
    heartPosition,
    movePlayer,
    showQuestions,
    currentQuestion,
    handleAnswer,
    gameCompleted,
    confetti,
    resetGame
  } = useGameState(mazeLayout);

  const [isMoving, setIsMoving] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [explodingGifs, setExplodingGifs] = useState<any[]>([]);

  const distance = calculateDistance(playerPosition, heartPosition);
  const heartOpacity = Math.max(0.2, Math.min(1, 1 - distance / 15));
  const timeoutIds = useRef<NodeJS.Timeout[]>([]);
  const audioElements = useRef<HTMLAudioElement[]>([]);
  const audioFiles = useRef([
    '/assets/airhorn.mp3',
    '/assets/boom.mp3',
    '/assets/lets-go.mp3',
    '/assets/sheesh.mp3',
    '/assets/wow.mp3'
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showQuestions) return;

      const key = e.key.toLowerCase();
      const moves: Record<string, [number, number]> = {
        w: [-1, 0],
        arrowup: [-1, 0],
        s: [1, 0],
        arrowdown: [1, 0],
        a: [0, -1],
        arrowleft: [0, -1],
        d: [0, 1],
        arrowright: [0, 1]
      };

      if (key in moves) {
        setIsMoving(true);
        e.preventDefault();
        movePlayer(moves[key][0], moves[key][1]);
      }
    };

    const handleKeyUp = () => {
      setIsMoving(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [movePlayer, showQuestions]);

  useEffect(() => {
    if (gameCompleted && confetti) {
      const gifs = generateRandomGifs(800);
      setExplodingGifs(gifs);

      const playChaoticAudio = () => {
        const randomIndex = Math.floor(Math.random() * audioFiles.current.length);
        const audio = new Audio(audioFiles.current[randomIndex]);

        // Randomize audio properties
        audio.addEventListener('ended', () => {
          audioElements.current = audioElements.current.filter((a) => a !== audio);
        });

        audioElements.current.push(audio);
        audio.play().catch((error) => console.error('Audio play failed:', error));

        // Schedule next play with random delay
        const delay = Math.random() * 300 + 100; // 100-400ms
        const timeoutId = setTimeout(playChaoticAudio, delay);
        timeoutIds.current.push(timeoutId);
      };

      // Start the audio chaos
      playChaoticAudio();

      // Cleanup function
      return () => {
        // Clear all scheduled timeouts
        timeoutIds.current.forEach(clearTimeout);
        timeoutIds.current = [];

        // Stop all playing audio
        audioElements.current.forEach((audio) => {
          audio.pause();
          audio.currentTime = 0;
        });
        audioElements.current = [];
      };
    }
  }, [gameCompleted, confetti]);

  const handleQuestionAnswer = (answer: string | boolean) => {
    handleAnswer(answer);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#2A2A2A] px-4">
      <div className="relative">
        <div
          className="grid gap-0 bg-[#1a1a1a] p-4 rounded-lg shadow-xl"
          style={{ imageRendering: 'pixelated' }}
        >
          {mazeLayout.map((row, rowIndex) => (
            <div key={rowIndex} className="flex">
              {row.split('').map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`w-12 h-12 ${cell === '#' ? 'bg-[#4a4a4a]' : 'bg-[#2a2a2a]'} ${
                    cell === '#' ? 'border-t border-r border-[#5a5a5a] border-opacity-20' : ''
                  }`}
                />
              ))}
            </div>
          ))}
        </div>

        <Player position={playerPosition} isMoving={isMoving} />
        <Heart position={heartPosition} opacity={heartOpacity} />

        {showQuestions && (
          <QuestionCard
            currentQuestion={currentQuestion}
            onAnswer={handleQuestionAnswer}
            resetGame={resetGame}
          />
        )}
      </div>
      {gameCompleted && confetti && (
        <>
          {/* Confetti */}
          <Confetti width={window.innerWidth} height={window.innerHeight} style={{ zIndex: 20 }} />

          {/* Exploding GIFs */}
          {explodingGifs.map((gif, index) => (
            <img
              key={index}
              src={gif.gif}
              alt="Exploding love"
              style={{
                position: 'absolute',
                left: `${gif.x}vw`,
                top: `${gif.y}vh`,
                width: `${gif.size}px`,
                height: `${gif.size}px`,
                transform: `rotate(${gif.rotation}deg)`,
                zIndex: 10,
                pointerEvents: 'none'
              }}
            />
          ))}
          {/* Confetti */}
          <Confetti width={window.innerWidth} height={window.innerHeight} style={{ zIndex: 10 }} />
        </>
      )}
    </div>
  );
};

export default Maze;
