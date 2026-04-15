import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '../context/QuizContext';

const CreateQuiz = () => {
  const navigate = useNavigate();
  const { addQuiz } = useQuiz();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { text: '', options: ['', '', '', ''], correct: 0 },
    ]);
  };

  const updateQuestion = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const updateOption = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || questions.length === 0) {
      alert('Please add a title and at least one question.');
      return;
    }
    addQuiz({ title, questions });
    navigate('/quizzes');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Create New Quiz</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Quiz Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="bg-white p-4 rounded-lg shadow">
            <input
              type="text"
              placeholder={`Question ${qIndex + 1}`}
              value={q.text}
              onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
              className="w-full p-2 border rounded mb-3"
              required
            />
            {q.options.map((opt, optIndex) => (
              <div key={optIndex} className="flex items-center mb-2">
                <input
                  type="radio"
                  name={`correct-${qIndex}`}
                  checked={q.correct === optIndex}
                  onChange={() => updateQuestion(qIndex, 'correct', optIndex)}
                  className="mr-2"
                />
                <input
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={opt}
                  onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                  className="flex-1 p-2 border rounded"
                  required
                />
              </div>
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
        >
          + Add Question
        </button>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Save Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;