import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import banner from "../assets/community.jpg"
import { useNavigate } from "react-router-dom";

const commonDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@hotmail.com"];

const LandingPage = () => {
  const [email, setEmail] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setShowSuggestions(value.includes("@"));
  };

  const handleSuggestionClick = (domain) => {
    const username = email.split("@")[0];
    setEmail(username + domain);
    setShowSuggestions(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("newuser")
      setEmail("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-6xl mx-auto py-8 md:py-16">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full lg:w-1/2">
            <div className="rounded-2xl shadow-xl overflow-hidden">
              <img
                src={banner}
                alt="Modern cancer care center"
                className="w-full h-[400px]"
                loading="lazy"
               
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Welcome to Cancer Care
            </h1>
            <p className="text-lg text-gray-600">
              Start your journey with us today, let us get the help you need
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    aria-label="Email address"
                    placeholder="Enter your email address"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                {showSuggestions && (
                  <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
                    {commonDomains.map((domain) => (
                      <button
                        key={domain}
                        type="button"
                        onClick={() => handleSuggestionClick(domain)}
                        className="w-full px-4 py-2 text-left hover:bg-blue-50"
                      >
                        {email.split("@")[0] + domain}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50"
                aria-label="Begin registration process"
              >
                {loading ? "Processing..." : "Begin Here"}
              </button>
            </form>

            <div className="text-center">
              <button
                type="button"
                onClick={()=>navigate("/login")}
                className="text-blue-600 hover:text-blue-800 font-medium px-4 py-2 rounded-lg"
                aria-label="Login for existing users"
              >
                Already have an account? Login here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default LandingPage;