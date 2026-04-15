import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { QuizProvider } from './context/QuizContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CreateQuiz from './pages/CreateQuiz';
import QuizList from './pages/QuizList';
import TakeQuiz from './pages/TakeQuiz';
import QuizResult from './pages/QuizResult';

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/quizzes" element={<QuizList />} />
              <Route path="/quiz/:id" element={<TakeQuiz />} />
              <Route path="/result" element={<QuizResult />} />
              <Route path="/create" element={
                <PrivateRoute>
                  <CreateQuiz />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </BrowserRouter>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;