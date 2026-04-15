import { useLocation, Link } from 'react-router-dom';

const QuizResult = () => {
  const location = useLocation();
  const { quiz, answers, score } = location.state || {};

  if (!quiz) return <div className="p-8 text-center">No result data</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-4">Quiz Results</h1>
      <div className="bg-white p-6 rounded-xl shadow mb-6">
        <p className="text-2xl">
          Your Score: {score} / {quiz.questions.length}
        </p>
      </div>
      <h2 className="text-xl font-semibold mb-4">Review Answers</h2>
      {quiz.questions.map((q, idx) => (
        <div key={idx} className="bg-white p-4 rounded-lg shadow mb-3">
          <p className="font-medium">{q.text}</p>
          <p className="text-sm">
            Your answer: {q.options[answers[idx]] || 'Not answered'}
          </p>
          <p className="text-sm text-green-600">
            Correct answer: {q.options[q.correct]}
          </p>
        </div>
      ))}
      <Link to="/" className="inline-block mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Back to Home
      </Link>
    </div>
  );
};

export default QuizResult;