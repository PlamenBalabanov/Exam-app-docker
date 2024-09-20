import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';  // Include custom CSS file

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
    // Move to the next question and clear any selected answer
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowAnswer(false);

      // Clear any selected radio button for the next question
      const selectedAnswer = document.querySelector('input[name="answer"]:checked');
      if (selectedAnswer) {
        selectedAnswer.checked = false;
      }
    } else {
      setQuizEnded(true);
    }
  };

  if (questions.length === 0) return <div>Loading...</div>;
  if (quizEnded) return (
    <div className="quiz-container">
      <div className="result-box">
        <h2>Quiz Ended</h2>
        <p>Your score: {score}/{questions.length}</p>
      </div>
    </div>
  );

  const q = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <div className="question-box">
        <h1>CCNA Practice Quiz</h1>
        <h2>Question {currentQuestion + 1} of {questions.length}</h2>
        <p>{q.question}</p>
        <div className="options">
          {q.options.map((option, index) => (
            <div key={index} className={`option ${showAnswer && index === q.correctAnswer ? 'correct' : showAnswer && document.querySelector(`input[value="${index}"]`)?.checked ? 'wrong' : ''}`}>
              <input type="radio" id={`option${index}`} name="answer" value={index} disabled={showAnswer} />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
          ))}
        </div>
        {showAnswer && <div className="explanation">{q.explanation}</div>}
        <div className="controls">
          {!showAnswer && <button onClick={handleReveal}>Reveal Answer</button>}
          {showAnswer && <button onClick={handleNext}>Next Question</button>}
        </div>
      </div>
    </div>
  );
}

export default App;
