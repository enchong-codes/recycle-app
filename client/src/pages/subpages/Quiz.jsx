import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext'; // Import the useUser hook

export default function QuizPage() {
  // Define quiz questions and answers
  const quizzes = [
    {
      question: 'How much energy does recycling one aluminum can save?',
      options: [
        'A) Enough to power a TV for 30 minutes',
        'B) Enough to power a TV for three hours',
        'C) Enough to power a fridge for a day',
        'D) Enough to power a computer for an hour',
      ],
      correctAnswer: 'B) Enough to power a TV for three hours',
    },
    {
      question:
        'How long can plastic bottles take to break down in the environment?',
      options: ['A) 50 years', 'B) 150 years', 'C) 250 years', 'D) 450 years'],
      correctAnswer: 'D) 450 years',
    },
    {
      question: 'Recycling one ton of paper saves how many trees?',
      options: ['A) 5', 'B) 10', 'C) 17', 'D) 25'],
      correctAnswer: 'C) 17',
    },
    {
      question:
        'How quickly can a recycled glass bottle return to a store shelf?',
      options: ['A) 7 days', 'B) 30 days', 'C) 90 days', 'D) 6 months'],
      correctAnswer: 'B) 30 days',
    },
    {
      question:
        'How much more energy does producing new plastic use compared to recycling old plastic?',
      options: ['A) 10%', 'B) 30%', 'C) 50%', 'D) 70%'],
      correctAnswer: 'D) 70%',
    },
  ];

  const { user, setUser } = useUser(); // Access user data and setUser from context
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [userAnswers, setUserAnswers] = useState([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');
  const [pointsAwarded, setPointsAwarded] = useState(0);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setQuizFinished(false);
    setCurrentQuizIndex(0);
    setUserAnswers([]);
    setScore(0);
    setMessage('');
    setPointsAwarded(0);
  };

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuiz = () => {
    // Store the user's answer and move to the next quiz
    setUserAnswers([...userAnswers, selectedAnswer]);

    // Check if the selected answer is correct and update the score
    if (selectedAnswer === quizzes[currentQuizIndex].correctAnswer) {
      setScore(score + 1);
    }

    // Move to the next quiz
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer('');
    } else {
      setQuizFinished(true); // End quiz when all questions are answered
      // Award points based on the score
      let points = 0;
      if (score === 5) {
        points = 20;
        setMessage(
          '🎉 Congratulations! You scored 100%! You have earned 20 points.'
        );
      } else if (score === 4) {
        points = 15;
        setMessage(
          '🎉 Congratulations! You scored 80%! You have earned 15 points.'
        );
      } else {
        points = 0;
        setMessage('❌ Try Again! You scored below 80%. Please try again.');
      }
      setPointsAwarded(points);

      // Update user points in the context
      if (user) {
        setUser({ ...user, points: user.points + points });
      }
    }
  };

  const handleRetryQuiz = () => {
    setQuizStarted(false); // Reset quiz state
  };

  return (
    <section>
      {!quizStarted ? (
        <button onClick={handleStartQuiz}>Start Quiz</button>
      ) : quizFinished ? (
        <div>
          <h2>Quiz Finished!</h2>
          <p>
            Your score: {score}/{quizzes.length}
          </p>
          <p className={score >= 4 ? 'success-message' : 'error-message'}>
            {message}
          </p>
          <button onClick={handleRetryQuiz}>Try Again</button>
        </div>
      ) : (
        <div>
          <h2>{quizzes[currentQuizIndex].question}</h2>
          <div>
            {quizzes[currentQuizIndex].options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={option}
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => handleAnswerSelection(option)}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
          <button onClick={handleNextQuiz} disabled={!selectedAnswer}>
            Next Question
          </button>
        </div>
      )}
      <Link to={'/dashboard'}>
        <button>Home</button>
      </Link>
    </section>
  );
}
