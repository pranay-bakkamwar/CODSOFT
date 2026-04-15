import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

const TakeQuiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getQuiz } = useQuiz();
  const quiz = getQuiz(id);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) return <div className="p-8 text-center">Quiz not found</div>;

  const handleAnswer = (optIndex) => {
    const newAnswers = [...answers];
    newAnswers[current] = optIndex;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (current < quiz.questions.length - 1) {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const submitQuiz = () => {
    let score = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correct) score++;
    });
    navigate('/result', { state: { quiz, answers, score } });
  };

  const q = quiz.questions[current];

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
      <p className="text-gray-500 mb-6">
        Question {current + 1} of {quiz.questions.length}
      </p>
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl mb-4">{q.text}</h2>
        <div className="space-y-3">
          {q.options.map((opt, idx) => (
            <label key={idx} className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name={`q-${current}`}
                checked={answers[current] === idx}
                onChange={() => handleAnswer(idx)}
                className="mr-3"
              />
              {opt}
            </label>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={prev}
            disabled={current === 0}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Previous
          </button>
          {current < quiz.questions.length - 1 ? (
            <button onClick={next} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Next
            </button>
          ) : (
            <button onClick={submitQuiz} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;