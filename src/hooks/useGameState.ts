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

  const resetGame = useCallback(() => {
    setPlayerPosition(() => {
      for (let i = 0; i < mazeLayout.length; i++) {
        const j = mazeLayout[i].indexOf('P');
        if (j !== -1) return [i, j];
      }
      return [1, 1];
    });
    setCurrentQuestion(0);
    setShowQuestions(false);
    setGameCompleted(false);
    setConfetti(false);
  }, [mazeLayout]);

  const movePlayer = useCallback(
    (deltaRow: number, deltaCol: number) => {
      setPlayerPosition(([row, col]) => {
        const newRow = row + deltaRow;
        const newCol = col + deltaCol;

        if (
          newRow >= 0 &&
          newRow < mazeLayout.length &&
          newCol >= 0 &&
          newCol < mazeLayout[0].length &&
          mazeLayout[newRow][newCol] !== '#'
        ) {
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
    (_answer: boolean | string) => {
      if (currentQuestion === 0 && typeof _answer === 'string' && _answer.toLowerCase() !== 'tam') {
        resetGame();
        return;
      }

      if (currentQuestion < 5) {
        setCurrentQuestion((q) => q + 1);
      } else {
        setShowQuestions(false);
        setGameCompleted(true);
        setConfetti(true);
      }
    },
    [currentQuestion, resetGame]
  );

  return {
    playerPosition,
    heartPosition,
    movePlayer,
    showQuestions,
    currentQuestion,
    handleAnswer,
    gameCompleted,
    confetti,
    resetGame
  };
};
