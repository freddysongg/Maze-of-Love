import React, { useState, useEffect } from 'react';
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

const Maze: React.FC = () => {
  const {
    playerPosition,
    heartPosition,
    movePlayer,
    showQuestions,
    currentQuestion,
    handleAnswer,
    gameCompleted,
    confetti
  } = useGameState(mazeLayout);

  const [isMoving, setIsMoving] = useState(false);

  const distance = calculateDistance(playerPosition, heartPosition);
  const heartOpacity = Math.max(0.2, Math.min(1, 1 - distance / 15));

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
          <QuestionCard currentQuestion={currentQuestion} onAnswer={handleAnswer} />
        )}

        {gameCompleted && confetti && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="animate-float text-4xl text-center mt-4 font-pixel text-white">
              💝 You're my Valentine! 💝
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Maze;
