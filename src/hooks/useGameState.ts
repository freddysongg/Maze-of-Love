import { useState, useCallback } from 'react';

export const useGameState = (mazeLayout: string[]) => {
  const [playerPosition, setPlayerPosition] = useState<[number, number]>(() => {
    for (let i = 0; i < mazeLayout.length; i++) {
      const j = mazeLayout[i].indexOf('P');
      if (j !== -1) return [i, j];
    }
    return [1, 1];
  });

  const [heartPosition] = useState<[number, number]>(() => {
    for (let i = 0; i < mazeLayout.length; i++) {
      const j = mazeLayout[i].indexOf('H');
      if (j !== -1) return [i, j];
    }
    return [9, 8];
  });

  const [showQuestions, setShowQuestions] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [confetti, setConfetti] = useState(false);

  const movePlayer = useCallback(
    (deltaRow: number, deltaCol: number) => {
      setPlayerPosition(([row, col]) => {
        const newRow = row + deltaRow;
        const newCol = col + deltaCol;

        // Check if the new position is within bounds and not a wall
        if (
          newRow >= 0 &&
          newRow < mazeLayout.length &&
          newCol >= 0 &&
          newCol < mazeLayout[0].length &&
          mazeLayout[newRow][newCol] !== '#'
        ) {
          // Check if player reached the heart
          if (newRow === heartPosition[0] && newCol === heartPosition[1]) {
            setShowQuestions(true);
          }
          return [newRow, newCol];
        }
        return [row, col];
      });
    },
    [mazeLayout, heartPosition]
  );

  const handleAnswer = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_answer: boolean | string) => {
      if (currentQuestion < 2) {
        setCurrentQuestion((q) => q + 1);
      } else {
        setShowQuestions(false);
        setGameCompleted(true);
        setConfetti(true);
      }
    },
    [currentQuestion]
  );

  return {
    playerPosition,
    heartPosition,
    movePlayer,
    showQuestions,
    currentQuestion,
    handleAnswer,
    gameCompleted,
    confetti
  };
};
