import React from 'react';

interface QuestionCardProps {
  currentQuestion: number;
  onAnswer: (answer: boolean) => void;
}

const questions = [
  {
    question: 'Hi babe, are you doing anything on Feb 14?',
    noResponse: 'Yay!! Next question!',
    yesResponse: "I don't care that you're not free, you're stuck with me... Next question!"
  },
  {
    question: 'Do you like cute dinos?',
    yesResponse: 'Great choice! Next question!',
    noResponse: "Even if you don't, this corgi loves you. Next question!"
  },
  {
    question: 'Can I be your Valentine?',
    yesResponse: "Yay! You're my Valentine!",
    noResponse: "I don't care, you're still my Valentine!"
  }
];

const QuestionCard: React.FC<QuestionCardProps> = ({ currentQuestion, onAnswer }) => {
  const [response, setResponse] = React.useState<string | null>(null);
  const question = questions[currentQuestion];

  const handleAnswer = (answer: boolean) => {
    setResponse(answer ? question.yesResponse : question.noResponse);
    setTimeout(() => {
      setResponse(null);
      onAnswer(answer);
    }, 5000);
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
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
