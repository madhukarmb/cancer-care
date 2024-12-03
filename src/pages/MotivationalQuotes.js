import React, { useState, useEffect } from "react";
import { FaQuoteLeft, FaQuoteRight, FaSync } from "react-icons/fa";

const MotivationalQuotes = () => {
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const quotes = [
    "Every day is a new beginning, and you have the strength to face it.",
    "You are braver than you know, stronger than you seem, and more capable than you imagine.",
    "Your courage inspires others. Keep fighting, keep believing.",
    "This too shall pass. Better days are ahead.",
    "You're not fighting alone. We're here with you every step of the way.",
    "Your strength is greater than any challenge ahead.",
    "Focus on the progress, not the perfection.",
    "Hope is the anchor for the soul, firm and secure.",
    "Each day brings new strength and new thoughts.",
    "You are resilient, you are powerful, you are a warrior."
  ];

  const getRandomQuote = () => {
    setLoading(true);
    setError(null);

    try {
      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError("Unable to fetch quote. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomQuote();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 flex items-center justify-center">
      <div className="max-w-4xl w-full mx-auto">
        <div 
          className="relative bg-white rounded-xl shadow-2xl p-8 md:p-12 transition-all duration-300 hover:shadow-3xl"
          style={{
            backgroundImage: `url("images.unsplash.com/photo-1516796181074-bf453fbfa3e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80")`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        >
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-xl"></div>
          
          <div className="relative z-10">
            <div className="flex flex-col items-center space-y-6">
              {error ? (
                <div 
                  role="alert"
                  className="text-red-600 text-center font-medium"
                >
                  {error}
                </div>
              ) : loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <FaSync className="animate-spin text-blue-600 text-xl" />
                  <span className="text-gray-600">Loading new quote...</span>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <FaQuoteLeft className="text-3xl text-blue-600 mx-auto" />
                  <p 
                    className="text-xl md:text-2xl lg:text-3xl text-gray-800 font-medium leading-relaxed"
                    role="text"
                  >
                    {quote}
                  </p>
                  <FaQuoteRight className="text-3xl text-blue-600 mx-auto" />
                </div>
              )}

              <button
                onClick={getRandomQuote}
                disabled={loading}
                className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full font-medium transform transition-all duration-300 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Show another motivational quote"
              >
                {loading ? "Loading..." : "Show Another Quote"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotivationalQuotes;