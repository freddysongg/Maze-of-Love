import React, { useState } from 'react';

interface QuestionCardProps {
  currentQuestion: number;
  onAnswer: (answer: boolean | string) => void;
  resetGame: () => void;
}

const questions = [
  {
    question: 'what is your name (for security reasons)?',
    response: (name: string) => (name.toLowerCase() === 'tam' ? 'hi babe :)' : 'get out. goodbye!'),
    type: 'input'
  },
  {
    question:
      "ok it might be you, but enter my birthday to make sure you're not an imposter (using format: MM/DD/YYYY)",
    response: (date: string) =>
      date === '02/18/2004'
        ? 'IT REALLY IS YOU BABE!! happy 3-month anniversary :)'
        : "wow you're fake, you might've forgot my birthday but i know it's you, happy 3-month anniversary :)",
    type: 'input'
  },
  {
    question: 'do you love me.',
    yesResponse: 'yea you really had no choice nice try though.',
    noResponse: 'yea you really had no choice nice try though.',
    type: 'button'
  },
  {
    question: 'are you free on feb 14? (you better be)',
    yesResponse: "you mean you're busy on feb 14 because you have a date with me, yea i know.",
    noResponse: "yea you shouldn't be free because you have a date with me, duh.",
    type: 'button'
  },
  {
    question:
      "well do you know why i made this game? i'll give you like 3 seconds to think about it.",
    yesResponse: 'ok, and why did i make it??',
    noResponse: "come on babe...you're dating a comsci guy what do you expect.",
    type: 'button'
  },
  {
    question: 'CAN YOU BE MY VALENTINE PLEASEEEEE',
    yesResponse: "LET'S GOOOOOOOOOOOOOO!",
    noResponse: "LET'S GOOOOOOOOOOOOOO!",
    type: 'button'
  }
];

const QuestionCard: React.FC<QuestionCardProps> = ({ currentQuestion, onAnswer, resetGame }) => {
  const [response, setResponse] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>('');
  const question = questions[currentQuestion];

  const handleAnswer = (answer: boolean | string) => {
    if (question.type === 'input' && typeof answer === 'string') {
      const customResponse = question.response
        ? question.response(answer)
        : 'thanks for your answer!';

      if (currentQuestion === 0 && answer.toLowerCase() !== 'tam') {
        setResponse(customResponse);
        setTimeout(() => {
          resetGame();
        }, 3000);
        return;
      }
      setResponse(customResponse);
    } else if (question.type === 'button' && typeof answer === 'boolean') {
      setResponse(answer ? (question.yesResponse ?? '') : (question.noResponse ?? ''));
    } else {
      setResponse(null);
    }

    setTimeout(() => {
      setResponse(null);
      onAnswer(answer);
      setInputValue('');
    }, 3000);
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6"
      style={{
        imageRendering: 'pixelated',
        width: '500px',
        background:
          'linear-gradient(45deg, #2a2a2a 25%, #3a3a3a 25%, #3a3a3a 50%, #2a2a2a 50%, #2a2a2a 75%, #3a3a3a 75%, #3a3a3a 100%)',
        backgroundSize: '8px 8px',
        border: '4px solid #4a4a4a',
        boxShadow: '0 0 0 4px #1a1a1a',
        borderRadius: '4px'
      }}
    >
      <div className="bg-[#1a1a1a] p-4 rounded">
        {response ? (
          <p className="text-xl font-pixel text-pink-500 animate-bounce text-center">{response}</p>
        ) : (
          <>
            <h2 className="text-2xl font-pixel mb-6 text-white text-center px-4">
              {question.question}
            </h2>
            {question.type === 'button' &&
            (currentQuestion === questions.length - 1 ||
              currentQuestion === questions.length - 4) ? (
              <div className="space-x-4 text-center">
                <button
                  onClick={() => handleAnswer(true)}
                  className="px-6 py-2 bg-pink-500 text-white font-pixel rounded hover:bg-pink-600 transition-colors"
                  style={{
                    border: '3px solid #2a2a2a',
                    boxShadow: '3px 3px 0 #2a2a2a'
                  }}
                >
                  yes
                </button>
                <button
                  onClick={() => handleAnswer(true)}
                  className="px-6 py-2 bg-pink-500 text-white font-pixel rounded hover:bg-pink-600 transition-colors"
                  style={{
                    border: '3px solid #2a2a2a',
                    boxShadow: '3px 3px 0 #2a2a2a'
                  }}
                >
                  YES
                </button>
              </div>
            ) : question.type === 'button' ? (
              <div className="space-x-4 text-center">
                <button
                  onClick={() => handleAnswer(true)}
                  className="px-6 py-2 bg-pink-500 text-white font-pixel rounded hover:bg-pink-600 transition-colors"
                  style={{
                    border: '3px solid #2a2a2a',
                    boxShadow: '3px 3px 0 #2a2a2a'
                  }}
                >
                  yes
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="px-6 py-2 bg-gray-500 text-white font-pixel rounded hover:bg-gray-600 transition-colors"
                  style={{
                    border: '3px solid #2a2a2a',
                    boxShadow: '3px 3px 0 #2a2a2a'
                  }}
                >
                  no
                </button>
              </div>
            ) : (
              <div className="text-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="px-4 py-2 w-full bg-gray-800 text-white font-pixel rounded border-2 border-pink-500"
                  placeholder="type your answer here..."
                />
                <button
                  onClick={() => handleAnswer(inputValue)}
                  className="mt-4 px-6 py-2 bg-pink-500 text-white font-pixel rounded hover:bg-pink-600 transition-colors"
                  style={{
                    border: '3px solid #2a2a2a',
                    boxShadow: '3px 3px 0 #2a2a2a'
                  }}
                >
                  submit
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
