import React, { useState, useRef } from "react";
import { FaMicrophone, FaPills, FaHeartbeat, FaQuestionCircle } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { ImSpinner8 } from "react-icons/im";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import axios from "axios";

const TextInputComponent = () => {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showMedModal, setShowMedModal] = useState(false);
  const [showSymptomsModal, setShowSymptomsModal] = useState(false);
  const [showQAModal, setShowQAModal] = useState(false);
  const recognitionRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useState(false);

  const predefinedPrompts = [
    "Tell me about artificial intelligence",
    "How does blockchain work?",
    "Explain quantum computing",
    "What are the latest tech trends?"
  ];

  const medicationData = {
    medications: [
      { name: "Aspirin", timing: "Morning", dosage: "1 tablet" },
      { name: "Vitamin D", timing: "Afternoon", dosage: "1 capsule" },
      { name: "Omega-3", timing: "Evening", dosage: "2 capsules" }
    ],
    diet: [
      { meal: "Breakfast", items: "Oatmeal, fruits, nuts" },
      { meal: "Lunch", items: "Grilled chicken, salad" },
      { meal: "Dinner", items: "Fish, vegetables, brown rice" }
    ]
  };

  const symptomsData = [
    { symptom: "Headache", diagnosis: "Possible migraine or tension headache" },
    { symptom: "Fever", diagnosis: "Possible viral infection" },
    { symptom: "Fatigue", diagnosis: "Could be due to lack of sleep or stress" }
  ];

  const qaData = [
    { question: "How to maintain good health?", answer: "Exercise regularly, eat balanced diet, get enough sleep" },
    { question: "What are common cold remedies?", answer: "Rest, hydration, over-the-counter medications" },
    { question: "When to see a doctor?", answer: "If symptoms persist for more than 3 days or become severe" }
  ];

  const speakText = (text) => {
    if (textToSpeechEnabled && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) {
      setError("Please enter some text before sending");
      return;
    }
    setIsLoading(true);
    setIsProcessing(true);
    setError("");
    try {
      setMessages(prev => [...prev, { type: "user", text: inputText }]);
      const botResponse = await postAgentCall(inputText);
      setMessages(prev => [...prev, { type: "bot", text: botResponse }]);
      if (textToSpeechEnabled) {
        speakText(botResponse);
      }
      setInputText("");
    } catch (err) {
      setError("Failed to send message. Please try again.");
    } finally {
      setIsLoading(false);
      setIsProcessing(false);
    }
  };

  // Added handler for Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const postAgentCall = async (message)=>{
      const res = await axios('/data', {method:"POST", data: {
        userid:"user1",
        message
      },
      url:"localhost:8081/api/talk2agent"});
      return await res.json();
  }

  const startListening = () => {
    if ("webkitSpeechRecognition" in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setInputText(transcript);
      };

      recognitionRef.current.start();
      setIsListening(true);
    } else {
      setError("Speech recognition is not supported in your browser");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handlePromptSelect = (prompt) => {
    setInputText(prompt);
    handleSendMessage();
  };

  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              ×
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white via-gray-100 to-gray-200 bg-opacity-80 relative overflow-hidden">
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={() => setTextToSpeechEnabled(!textToSpeechEnabled)}
          className="flex items-center space-x-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-full transition-all duration-300"
        >
          {textToSpeechEnabled ? (
            <BsToggleOn className="w-6 h-6" />
          ) : (
            <BsToggleOff className="w-6 h-6" />
          )}
          <span>Enable voice response</span>
        </button>
      </div>

      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-4 z-20">
        <button
          onClick={() => setShowMedModal(true)}
          className="p-4 bg-gray-500 hover:bg-gray-600 rounded-full text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <FaPills className="w-6 h-6" />
        </button>
        <button
          onClick={() => setShowSymptomsModal(true)}
          className="p-4 bg-gray-500 hover:bg-gray-600 rounded-full text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <FaHeartbeat className="w-6 h-6" />
        </button>
        <button
          onClick={() => setShowQAModal(true)}
          className="p-4 bg-gray-500 hover:bg-gray-600 rounded-full text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
        >
          <FaQuestionCircle className="w-6 h-6" />
        </button>
      </div>

      <Modal
        isOpen={showMedModal}
        onClose={() => setShowMedModal(false)}
        title="Today's Medications & Diet Plan"
      >
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Medications</h3>
            <div className="space-y-2">
              {medicationData.medications.map((med, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">{med.name}</p>
                  <p className="text-sm text-gray-600">{med.timing} - {med.dosage}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Diet Plan</h3>
            <div className="space-y-2">
              {medicationData.diet.map((meal, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">{meal.meal}</p>
                  <p className="text-sm text-gray-600">{meal.items}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showSymptomsModal}
        onClose={() => setShowSymptomsModal(false)}
        title="Symptoms Tracker"
      >
        <div className="space-y-4">
          {symptomsData.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-800 mb-2">{item.symptom}</p>
              <p className="text-sm text-gray-600">{item.diagnosis}</p>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={showQAModal}
        onClose={() => setShowQAModal(false)}
        title="Medical Q&A"
      >
        <div className="space-y-4">
          {qaData.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-800 mb-2">{item.question}</p>
              <p className="text-sm text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </Modal>

      <div className="absolute left-1/2 transform -translate-x-1/2 top-1/4 w-full max-w-2xl px-4 overflow-y-auto max-h-[40vh] scrollbar-hide">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg ${message.type === "user" 
                  ? "bg-gray-600 text-white" 
                  : "bg-white text-gray-800"}`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${isProcessing ? "top-[85%] scale-75 opacity-70" : messages.length > 0 ? "top-[85%]" : "top-1/2 -translate-y-1/2"} w-full max-w-2xl px-4`}>
        <div className="relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-6 py-4 bg-white bg-opacity-90 backdrop-blur-md rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-gray-800 pr-32"
            placeholder="Type your message..."
            aria-label="Message input"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`p-3 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 ${isListening ? "bg-gray-600 hover:bg-gray-700" : "bg-gray-500 hover:bg-gray-600"}`}
              aria-label={isListening ? "Stop voice input" : "Start voice input"}
            >
              <FaMicrophone className="text-white w-5 h-5" />
            </button>
            <button
              onClick={handleSendMessage}
              disabled={isLoading}
              className="p-3 bg-gray-500 hover:bg-gray-600 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Send message"
            >
              {isLoading ? (
                <ImSpinner8 className="w-5 h-5 text-white animate-spin" />
              ) : (
                <IoMdSend className="text-white w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div className={`mt-4 flex flex-wrap gap-2 justify-center transition-all duration-500 ${isProcessing ? "opacity-0" : "opacity-100"}`}>
          {predefinedPrompts.map((prompt, index) => (
            <button
              key={index}
              onClick={() => handlePromptSelect(prompt)}
              className="px-4 py-2 bg-white bg-opacity-90 rounded-full text-sm text-gray-700 hover:bg-opacity-100 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              {prompt}
            </button>
          ))}
        </div>

        {error && (
          <div className="mt-4 px-4 py-2 bg-gray-600 bg-opacity-90 text-white rounded-lg text-center animate-shake">
            {error}
          </div>
        )}
      </div>

      {isProcessing && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="w-16 h-16 border-4 border-gray-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600 font-semibold">Processing your request...</p>
        </div>
      )}

      <div className="absolute bottom-4 left-0 right-0 text-center text-gray-600 text-sm">
        © {new Date().getFullYear()} evatechnologies.us. All rights reserved.
      </div>
    </div>
  );
};

export default TextInputComponent;