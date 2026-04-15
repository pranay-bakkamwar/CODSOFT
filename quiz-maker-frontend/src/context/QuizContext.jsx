import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const { user } = useAuth(); // Get current logged-in user

  // Load quizzes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('quizzes');
    if (stored) {
      try {
        setQuizzes(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse quizzes:', error);
      }
    }
  }, []);

  // Save quizzes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  // Add a new quiz (includes creator info)
  const addQuiz = (quiz) => {
    const newQuiz = {
      ...quiz,
      id: Date.now().toString(),
      createdBy: user?.name || 'Anonymous',
      userId: user?.id || 'guest',
      createdAt: new Date().toISOString(),
    };
    setQuizzes((prev) => [...prev, newQuiz]);
  };

  // Get a single quiz by ID
  const getQuiz = (id) => quizzes.find((q) => q.id === id);

  // Optional: Delete a quiz (only if user owns it)
  const deleteQuiz = (id) => {
    if (user) {
      setQuizzes((prev) => prev.filter((q) => !(q.id === id && q.userId === user.id)));
    }
  };

  // Optional: Get quizzes created by current user
  const getMyQuizzes = () => {
    if (!user) return [];
    return quizzes.filter((q) => q.userId === user.id);
  };

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        addQuiz,
        getQuiz,
        deleteQuiz,
        getMyQuizzes,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => useContext(QuizContext);