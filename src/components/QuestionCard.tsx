import React, { useState } from 'react';

interface QuestionCardProps {
  currentQuestion: number;
  onAnswer: (answer: boolean | string) => void;
}

const questions = [
  {
    question: 'What is your name (for security credentials)?',
    response: (name: string) => `Hi ${name}, you're all set! Next question!`,
    type: 'input' 
  },
  {
    question: 'Hi babe, are you doing anything on Feb 14?',
    noResponse: 'Yay!! Next question!',
    yesResponse: "I don't care that you're not free, you're stuck with me... Next question!",
    type: 'button' 
  },
  {
    question: 'Do you like cute dinos?',
    yesResponse: 'Great choice! Next question!',
    noResponse: "Even if you don't, this corgi loves you. Next question!",
    type: 'button' 
  },
  {
    question: 'Can I be your Valentine?',
    yesResponse: "Yay! You're my Valentine!",
    noResponse: "I don't care, you're still my Valentine!",
    type: 'button' 
  }
];

const QuestionCard: React.FC<QuestionCardProps> = ({ currentQuestion, onAnswer }) => {
  const [response, setResponse] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>(''); 
  const question = questions[currentQuestion];

  const handleAnswer = (answer: boolean | string) => {
    if (question.type === 'input' && typeof answer === 'string') {
      const customResponse = question.response ? question.response(answer) : 'Thanks for your answer!';
      setResponse(customResponse);
    } else if (question.type === 'button' && typeof answer === 'boolean') {
      setResponse(answer ? question.yesResponse ?? '' : question.noResponse ?? '');
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
        width: '400px',
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
            {question.type === 'button' ? (
              <div className="space-x-4 text-center">
                <button
                  onClick={() => handleAnswer(true)}
                  className="px-6 py-2 bg-pink-500 text-white font-pixel rounded hover:bg-pink-600 transition-colors"
                  style={{
                    border: '3px solid #2a2a2a',
                    boxShadow: '3px 3px 0 #2a2a2a'
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="px-6 py-2 bg-gray-500 text-white font-pixel rounded hover:bg-gray-600 transition-colors"
                  style={{
                    border: '3px solid #2a2a2a',
                    boxShadow: '3px 3px 0 #2a2a2a'
                  }}
                >
                  No
                </button>
              </div>
            ) : (
              <div className="text-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="px-4 py-2 w-full bg-gray-800 text-white font-pixel rounded border-2 border-pink-500"
                  placeholder="Type your answer here..."
                />
                <button
                  onClick={() => handleAnswer(inputValue)}
                  className="mt-4 px-6 py-2 bg-pink-500 text-white font-pixel rounded hover:bg-pink-600 transition-colors"
                  style={{
                    border: '3px solid #2a2a2a',
                    boxShadow: '3px 3px 0 #2a2a2a'
                  }}
                >
                  Submit
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
