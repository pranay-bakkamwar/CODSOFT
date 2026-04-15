import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">QuizMaker</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/quizzes" className="hover:text-blue-600">Browse Quizzes</Link>
          {user ? (
            <>
              <span className="text-gray-600">Hello, {user.name}</span>
              <Link to="/create" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Create Quiz</Link>
              <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;