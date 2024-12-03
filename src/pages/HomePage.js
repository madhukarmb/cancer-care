import React, { useState } from "react";
import { FiUser, FiSettings, FiChevronDown, FiClock, FiHelpCircle } from "react-icons/fi";
import { RiMentalHealthLine, RiMedicineBottleLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const MedicalDashboard = () => {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const user = {
    name: "Sarah Wilson",
    role: "Software Engineer",
    profileImage: "images.unsplash.com/photo-1559839734-2b71ea197ec2"
  };

  const cards = [
    {
      id: 1,
      title: "Symptom Tracker",
      description: "Track and monitor patient symptoms",
      icon: <RiMentalHealthLine className="w-8 h-8" />,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-500",
      path:"/symptoms"
    },
    {
      id: 2,
      title: "Medication & Diet",
      description: "Manage medications and dietary plans",
      icon: <RiMedicineBottleLine className="w-8 h-8" />,
      bgColor: "bg-green-50",
      iconColor: "text-green-500",
      path:"/medication"
    },
    {
      id: 3,
      title: "Motivational Quotes",
      description: "Daily inspiration for wellness",
      icon: <BiMessageSquareDetail className="w-8 h-8" />,
      bgColor: "bg-purple-50",
      iconColor: "text-purple-500",
      path:"/quotes"
    },
    {
      id: 4,
      title: "Medical Q&A",
      description: "Get answers to medical queries",
      icon: <FiHelpCircle className="w-8 h-8" />,
      bgColor: "bg-orange-50",
      iconColor: "text-orange-500",
      path:"/qna"
    }
  ];

  const handleCardClick = (card) => {
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      navigate(card.path)
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={`https://${user.profileImage}`}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330";
                }}
              />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-500">{user.role}</p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Account settings"
              >
                <FiSettings className="w-5 h-5" />
                <span>Settings</span>
                <FiChevronDown className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Profile Settings
                  </button>
                  <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Preferences
                  </button>
                  <button onClick={()=> navigate("/")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`${card.bgColor} p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 relative overflow-hidden`}
              aria-label={card.title}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className={`${card.iconColor}`}>{card.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.description}</p>
                {loading && (
                  <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MedicalDashboard;