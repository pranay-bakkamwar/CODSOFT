import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
        Online Quiz Maker
      </h1>
      <p className="text-xl text-gray-600 mb-8">
        Create your own quizzes or challenge yourself with existing ones.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition"
        >
          Create Quiz
        </Link>
        <Link
          to="/quizzes"
          className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 px-8 py-3 rounded-full font-semibold shadow-lg transition"
        >
          Take Quiz
        </Link>
      </div>
    </div>
  );
};

export default HomePage;