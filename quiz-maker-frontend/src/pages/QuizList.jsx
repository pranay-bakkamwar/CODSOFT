import { Link } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';

const QuizList = () => {
  const { quizzes, deleteQuiz } = useQuiz();
  const { user } = useAuth();

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      deleteQuiz(id);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
      {quizzes.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No quizzes yet. <Link to="/create" className="text-blue-600 hover:underline">Create one!</Link>
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => {
            const isOwner = user && quiz.userId === user.id;
            return (
              <div
                key={quiz.id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition relative"
              >
                <Link to={`/quiz/${quiz.id}`}>
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">
                    {quiz.title}
                  </h2>
                  <p className="text-gray-500 mb-1">
                    {quiz.questions.length} question{quiz.questions.length !== 1 ? 's' : ''}
                  </p>
                  <p className="text-sm text-gray-400">
                    Created by: {quiz.createdBy || 'Anonymous'}
                  </p>
                </Link>
                {isOwner && (
                  <button
                    onClick={() => handleDelete(quiz.id)}
                    className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuizList;