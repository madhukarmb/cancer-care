import React, { useState } from "react";
import { FaClock, FaPills, FaUtensils, FaCheck, FaPlus, FaTimes, FaEdit, FaTrash } from "react-icons/fa";

const MedicationAndDiet = () => {
  const [activeTab, setActiveTab] = useState("medication");
  const [consumedMeds, setConsumedMeds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDietModalOpen, setIsDietModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editDietId, setEditDietId] = useState(null);
  // Added new state variables for medication editing
  const [editMedMode, setEditMedMode] = useState(false);
  const [editMedId, setEditMedId] = useState(null);

  const [medicationData, setMedicationData] = useState([
    {
      id: 1,
      name: "Vitamin D3",
      dosage: "1000 IU",
      timing: "Morning",
      instructions: "Take with breakfast"
    },
    {
      id: 2,
      name: "Omega-3",
      dosage: "500mg",
      timing: "Evening",
      instructions: "Take after dinner"
    },
    {
      id: 3,
      name: "Multivitamin",
      dosage: "1 tablet",
      timing: "Morning",
      instructions: "Take with water"
    }
  ]);

  const [newMedication, setNewMedication] = useState({
    name: "",
    dosage: "",
    timing: "Morning",
    instructions: ""
  });

  const [dietData, setDietData] = useState([
    {
      id: 1,
      mealTime: "Breakfast",
      menu: "Oatmeal with berries",
      calories: 350,
      instructions: "Add honey for taste"
    },
    {
      id: 2,
      mealTime: "Lunch",
      menu: "Grilled chicken salad",
      calories: 450,
      instructions: "Use olive oil dressing"
    },
    {
      id: 3,
      mealTime: "Dinner",
      menu: "Baked salmon with vegetables",
      calories: 550,
      instructions: "Steam vegetables for 10 minutes"
    }
  ]);

  const [newDiet, setNewDiet] = useState({
    mealTime: "Breakfast",
    menu: "",
    calories: "",
    instructions: ""
  });

  // Added function to handle medication editing
  const handleEditMedication = (med) => {
    setEditMedMode(true);
    setEditMedId(med.id);
    setNewMedication({
      name: med.name,
      dosage: med.dosage,
      timing: med.timing,
      instructions: med.instructions
    });
    setIsModalOpen(true);
  };

  // Added function to handle medication deletion
  const handleDeleteMedication = (id) => {
    setMedicationData(prev => prev.filter(item => item.id !== id));
  };

  const handleMedicationConsumption = (medId) => {
    setConsumedMeds(prev => {
      if (prev.includes(medId)) {
        return prev.filter(id => id !== medId);
      }
      return [...prev, medId];
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMedication(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDietInputChange = (e) => {
    const { name, value } = e.target;
    setNewDiet(prev => ({
      ...prev,
      [name]: name === "calories" ? parseInt(value) || "" : value
    }));
  };

  // Modified handleSubmit to handle both create and update operations
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMedMode) {
      setMedicationData(prev =>
        prev.map(item =>
          item.id === editMedId ? { ...newMedication, id: editMedId } : item
        )
      );
      setEditMedMode(false);
      setEditMedId(null);
    } else {
      const newMed = {
        id: medicationData.length + 1,
        ...newMedication
      };
      setMedicationData(prev => [...prev, newMed]);
    }
    setNewMedication({
      name: "",
      dosage: "",
      timing: "Morning",
      instructions: ""
    });
    setIsModalOpen(false);
  };

  const handleDietSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setDietData(prev =>
        prev.map(item =>
          item.id === editDietId ? { ...newDiet, id: editDietId } : item
        )
      );
      setEditMode(false);
      setEditDietId(null);
    } else {
      const newDietItem = {
        id: dietData.length + 1,
        ...newDiet
      };
      setDietData(prev => [...prev, newDietItem]);
    }
    setNewDiet({
      mealTime: "Breakfast",
      menu: "",
      calories: "",
      instructions: ""
    });
    setIsDietModalOpen(false);
  };

  const handleDeleteDiet = (id) => {
    setDietData(prev => prev.filter(item => item.id !== id));
  };

  const handleEditDiet = (diet) => {
    setEditMode(true);
    setEditDietId(diet.id);
    setNewDiet({
      mealTime: diet.mealTime,
      menu: diet.menu,
      calories: diet.calories,
      instructions: diet.instructions
    });
    setIsDietModalOpen(true);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="flex space-x-4 border-b mb-6">
        <button
          onClick={() => setActiveTab("medication")}
          className={`flex items-center px-6 py-3 focus:outline-none ${
            activeTab === "medication"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          role="tab"
          aria-selected={activeTab === "medication"}
        >
          <FaPills className="mr-2" />
          <span>Medication</span>
        </button>
        <button
          onClick={() => setActiveTab("diet")}
          className={`flex items-center px-6 py-3 focus:outline-none ${
            activeTab === "diet"
              ? "border-b-2 border-blue-500 text-blue-500"
              : "text-gray-500 hover:text-blue-500"
          }`}
          role="tab"
          aria-selected={activeTab === "diet"}
        >
          <FaUtensils className="mr-2" />
          <span>Diet</span>
        </button>
      </div>

      <div className="transition-all duration-300">
        {activeTab === "medication" && (
          <div className="mb-4">
            <button
              onClick={() => {
                setEditMedMode(false);
                setNewMedication({
                  name: "",
                  dosage: "",
                  timing: "Morning",
                  instructions: ""
                });
                setIsModalOpen(true);
              }}
              className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add Medication
            </button>
          </div>
        )}

        {activeTab === "diet" && (
          <div className="mb-4">
            <button
              onClick={() => {
                setEditMode(false);
                setNewDiet({
                  mealTime: "Breakfast",
                  menu: "",
                  calories: "",
                  instructions: ""
                });
                setIsDietModalOpen(true);
              }}
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              <FaPlus className="mr-2" />
              Add Diet Item
            </button>
          </div>
        )}

        {/* Medication Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editMedMode ? "Edit Medication" : "Add New Medication"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Medication Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={newMedication.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dosage
                  </label>
                  <input
                    type="text"
                    name="dosage"
                    value={newMedication.dosage}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Timing
                  </label>
                  <select
                    name="timing"
                    value={newMedication.timing}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instructions
                  </label>
                  <textarea
                    name="instructions"
                    value={newMedication.instructions}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                >
                  {editMedMode ? "Update Medication" : "Add Medication"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Diet Modal */}
        {isDietModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-full max-w-md">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editMode ? "Edit Diet Item" : "Add New Diet Item"}
                </h2>
                <button
                  onClick={() => setIsDietModalOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FaTimes />
                </button>
              </div>
              <form onSubmit={handleDietSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Meal Time
                  </label>
                  <select
                    name="mealTime"
                    value={newDiet.mealTime}
                    onChange={handleDietInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  >
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Menu
                  </label>
                  <input
                    type="text"
                    name="menu"
                    value={newDiet.menu}
                    onChange={handleDietInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Calories
                  </label>
                  <input
                    type="number"
                    name="calories"
                    value={newDiet.calories}
                    onChange={handleDietInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Instructions
                  </label>
                  <textarea
                    name="instructions"
                    value={newDiet.instructions}
                    onChange={handleDietInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
                >
                  {editMode ? "Update Diet Item" : "Add Diet Item"}
                </button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "medication" ? (
          <div className="space-y-4">
            {medicationData.map((med) => (
              <div
                key={med.id}
                className={`p-4 bg-blue-50 rounded-lg hover:shadow-md transition-shadow ${consumedMeds.includes(med.id) ? "opacity-70" : ""}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-grow">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-blue-800">
                        {med.name}
                      </h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={consumedMeds.includes(med.id)}
                              onChange={() => handleMedicationConsumption(med.id)}
                              className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-600">
                              {consumedMeds.includes(med.id) ? "Consumed" : "Mark as consumed"}
                            </span>
                          </label>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditMedication(med)}
                            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteMedication(med.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">Dosage: {med.dosage}</p>
                    <p className="text-gray-600">{med.instructions}</p>
                  </div>
                  <div className="flex items-center text-blue-600 ml-4">
                    <FaClock className="mr-2" />
                    <span>{med.timing}</span>
                  </div>
                </div>
                {consumedMeds.includes(med.id) && (
                  <div className="mt-2 flex items-center text-green-600">
                    <FaCheck className="mr-1" />
                    <span className="text-sm">Completed</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {dietData.map((meal) => (
              <div
                key={meal.id}
                className="p-4 bg-green-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-green-800">
                      {meal.mealTime}
                    </h3>
                    <p className="text-gray-600">{meal.menu}</p>
                    <p className="text-gray-600">{meal.instructions}</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <div className="text-green-600 font-medium">
                      {meal.calories} cal
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditDiet(meal)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteDiet(meal.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicationAndDiet;