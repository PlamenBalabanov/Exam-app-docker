import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    axios.get('http://192.168.88.234:5000/questions')
      .then(response => setQuestions(response.data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleReveal = () => {
    setShowAnswer(true);
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer && parseInt(selectedAnswer.value) === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);
    } else {
      setQuizEnded(true);
    }
  };

  if (questions.length === 0) return <div>Loading...</div>;
  if (quizEnded) return <div>Quiz ended. Your score: {score}/{questions.length}</div>;

  const q = questions[currentQuestion];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-center mb-8">CCNA Practice Quiz</h1>
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Question {currentQuestion + 1} of {questions.length}</h2>
        <p className="mb-4">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((option, index) => (
            <div key={index} className={showAnswer ? 
              (index === q.correctAnswer ? 'bg-green-200' : 
              document.querySelector(`input[value="${index}"]`)?.checked ? 'bg-red-200' : '') : ''}>
              <input type="radio" id={`option${index}`} name="answer" value={index} disabled={showAnswer} />
              <label htmlFor={`option${index}`} className="ml-2">{option}</label>
            </div>
          ))}
        </div>
        {showAnswer && (
          <div className="mt-4 p-4 bg-gray-100 rounded">
            <p>{q.explanation}</p>
          </div>
        )}
        <div className="mt-6 space-x-4">
          {!showAnswer && (
            <button onClick={handleReveal} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Reveal Answer
            </button>
          )}
          {showAnswer && (
            <button onClick={handleNext} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
