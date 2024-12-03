import React, { useState } from "react";
import { FaSearch, FaSpinner } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";

const MedicalQA = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [newAnswers, setNewAnswers] = useState({});
  const [answerErrors, setAnswerErrors] = useState({});
  const [isSubmittingAnswer, setIsSubmittingAnswer] = useState({});

  const mockQA = [
    {
      id: 1,
      question: "What are the common symptoms of diabetes?",
      answer: "Common symptoms of diabetes include increased thirst, frequent urination, extreme hunger, unexplained weight loss, fatigue, blurred vision, and slow-healing sores.",
      doctor: "Dr. Sarah Johnson",
      specialty: "Endocrinologist",
      timestamp: "2 hours ago",
      avatar: "images.unsplash.com/photo-1559839734-2b71ea197ec2",
      answers: [
        {
          id: 1,
          text: "Additionally, diabetes can also cause numbness in extremities and increased susceptibility to infections.",
          author: "Dr. James Wilson",
          timestamp: "1 hour ago"
        }
      ]
    },
    {
      id: 2,
      question: "How can I manage high blood pressure naturally?",
      answer: "Natural ways to manage high blood pressure include regular exercise, maintaining a healthy diet low in sodium, reducing stress, limiting alcohol intake, and getting adequate sleep.",
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      timestamp: "1 day ago",
      avatar: "images.unsplash.com/photo-1612349317150-e413f6a5b16d",
      answers: []
    },
    {
      id: 3,
      question: "What vaccines are recommended for adults?",
      //answer: "Adults should maintain up-to-date vaccinations including flu shots annually, Tdap every 10 years, and may need others based on age, health conditions, and lifestyle factors.",
      // doctor: "Dr. Emily Rodriguez",
      // specialty: "Family Medicine",
      // timestamp: "3 days ago",
      avatar: "images.unsplash.com/photo-1594824476967-48c8b964273f",
      answers: []
    }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmitQuestion = (e) => {
    e.preventDefault();
    if (newQuestion.trim() === "") {
      setError("Please enter your question");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setNewQuestion("");
      setError("");
    }, 1500);
  };

  const handleAnswerChange = (qaId, value) => {
    setNewAnswers(prev => ({
      ...prev,
      [qaId]: value
    }));
    // Clear error when user starts typing
    if (answerErrors[qaId]) {
      setAnswerErrors(prev => ({
        ...prev,
        [qaId]: ""
      }));
    }
  };

  const handleSubmitAnswer = (qaId) => {
    if (!newAnswers[qaId] || newAnswers[qaId].trim() === "") {
      setAnswerErrors(prev => ({
        ...prev,
        [qaId]: "Please enter an answer"
      }));
      return;
    }

    setIsSubmittingAnswer(prev => ({
      ...prev,
      [qaId]: true
    }));

    // Simulate API call
    setTimeout(() => {
      setIsSubmittingAnswer(prev => ({
        ...prev,
        [qaId]: false
      }));
      setNewAnswers(prev => ({
        ...prev,
        [qaId]: ""
      }));
    }, 1500);
  };

  const filteredQA = mockQA.filter((qa) =>
    qa.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    qa.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Medical Q&A Platform
        </h1>

        <div className="mb-8 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Search questions"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <form onSubmit={handleSubmitQuestion} className="mb-12 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Ask a New Question</h2>
          <div className="space-y-4">
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Type your medical question here..."
              className={`w-full px-4 py-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
              rows="4"
              aria-label="Question input"
            />
            {error && (
              <p className="text-red-500 text-sm" role="alert">{error}</p>
            )}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 flex items-center justify-center space-x-2 transition-colors duration-200"
            >
              {isLoading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <>
                  <IoMdSend />
                  <span>Submit Question</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="space-y-6">
          {filteredQA.map((qa) => (
            <div key={qa.id} className="bg-white p-6 rounded-lg shadow-md transition-transform hover:scale-[1.02]">
              <div className="flex items-start space-x-4">
                <img
                  src={`https://${qa.avatar}`}
                  alt={qa.doctor}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d";
                  }}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{qa.question}</h3>
                  <p className="text-gray-700 mb-4">{qa.answer}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="font-medium">{qa.doctor}</span>
                    <span className="mx-2">•</span>
                    <span>{qa.specialty}</span>
                    <span className="mx-2">•</span>
                    <span>{qa.timestamp}</span>
                  </div>

                  {/* Additional Answers Section */}
                  {qa.answers.length > 0 && (
                    <div className="mt-4 space-y-4">
                      <h4 className="text-md font-semibold text-gray-800">Additional Responses:</h4>
                      {qa.answers.map((answer) => (
                        <div key={answer.id} className="pl-4 border-l-2 border-gray-200">
                          <p className="text-gray-700">{answer.text}</p>
                          <div className="flex items-center text-sm text-gray-500 mt-2">
                            <span className="font-medium">{answer.author}</span>
                            <span className="mx-2">•</span>
                            <span>{answer.timestamp}</span>
                          </div>
                        </div>
                      ))}  
                    </div>
                  )}

                  {/* Answer Form */}
                  <div className="mt-6 space-y-4">
                    <textarea
                      value={newAnswers[qa.id] || ""}
                      onChange={(e) => handleAnswerChange(qa.id, e.target.value)}
                      placeholder="Add your response..."
                      className={`w-full px-4 py-3 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${answerErrors[qa.id] ? 'border-red-500' : 'border-gray-300'}`}
                      rows="3"
                    />
                    {answerErrors[qa.id] && (
                      <p className="text-red-500 text-sm">{answerErrors[qa.id]}</p>
                    )}
                    <button
                      onClick={() => handleSubmitAnswer(qa.id)}
                      disabled={isSubmittingAnswer[qa.id]}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 flex items-center space-x-2 transition-colors duration-200"
                    >
                      {isSubmittingAnswer[qa.id] ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <>
                          <IoMdSend />
                          <span>Submit Response</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicalQA;