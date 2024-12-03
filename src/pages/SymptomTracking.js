import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SymptomTracking = () => {
  const [symptoms, setSymptoms] = useState([
    { id: 1, name: "Headache", startDate: new Date(), severity: "moderate" },
    { id: 2, name: "Fever", startDate: new Date(), severity: "severe" },
    { id: 3, name: "Cough", startDate: new Date(), severity: "mild" },
  ]);

  const [newSymptom, setNewSymptom] = useState("");
  const [newStartDate, setNewStartDate] = useState(new Date());
  const [newSeverity, setNewSeverity] = useState("mild");
  const [editingSymptom, setEditingSymptom] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedDate, setEditedDate] = useState(new Date());
  const [editedSeverity, setEditedSeverity] = useState("");

  const severityOptions = ["mild", "moderate", "severe"];

  const handleAddSymptom = (e) => {
    e.preventDefault();
    if (newSymptom.trim()) {
      setSymptoms([
        ...symptoms,
        {
          id: Date.now(),
          name: newSymptom.trim(),
          startDate: newStartDate,
          severity: newSeverity,
        },
      ]);
      setNewSymptom("");
      setNewStartDate(new Date());
      setNewSeverity("mild");
    }
  };

  const handleEditClick = (symptom) => {
    setEditingSymptom(symptom);
    setEditedName(symptom.name);
    setEditedDate(new Date(symptom.startDate));
    setEditedSeverity(symptom.severity);
    setShowModal(true);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (editedName.trim()) {
      setSymptoms(
        symptoms.map((s) =>
          s.id === editingSymptom.id
            ? {
                ...s,
                name: editedName.trim(),
                startDate: editedDate,
                severity: editedSeverity,
              }
            : s
        )
      );
      setShowModal(false);
      setEditingSymptom(null);
      setEditedName("");
      setEditedDate(new Date());
      setEditedSeverity("");
    }
  };

  const handleDelete = (id) => {
    setSymptoms(symptoms.filter((s) => s.id !== id));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "mild":
        return "bg-green-100 text-green-800";
      case "moderate":
        return "bg-yellow-100 text-yellow-800";
      case "severe":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Symptom Tracker</h2>

          <form onSubmit={handleAddSymptom} className="mb-6 space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newSymptom}
                onChange={(e) => setNewSymptom(e.target.value)}
                placeholder="Enter new symptom"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                aria-label="New symptom name"
              />
            </div>
            <div className="flex gap-2">
              <DatePicker
                selected={newStartDate}
                onChange={(date) => setNewStartDate(date)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                dateFormat="MM/dd/yyyy"
              />
              <select
                value={newSeverity}
                onChange={(e) => setNewSeverity(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              >
                {severityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 flex items-center gap-2"
                aria-label="Add symptom"
              >
                <FaPlus className="text-sm" />
                Add
              </button>
            </div>
          </form>

          <ul className="space-y-3">
            {symptoms.map((symptom) => (
              <li
                key={symptom.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-gray-800 font-medium">{symptom.name}</span>
                  <div className="flex gap-2 text-sm text-gray-600">
                    <span>{new Date(symptom.startDate).toLocaleDateString()}</span>
                    <span className={`px-2 py-1 rounded-full ${getSeverityColor(symptom.severity)}`}>
                      {symptom.severity}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditClick(symptom)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors duration-200"
                    aria-label={`Edit ${symptom.name}`}
                  >
                    <FaEdit className="text-lg" />
                  </button>
                  <button
                    onClick={() => handleDelete(symptom.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors duration-200"
                    aria-label={`Delete ${symptom.name}`}
                  >
                    <FaTrash className="text-lg" />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          {/* New Diagnostic Suggestion Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Suggested Diagnosis</h3>
            <p className="text-gray-600">
              Based on the current symptoms tracked:
              {symptoms.length > 0 ? (
                <span className="block mt-2">
                  The combination of {symptoms.map(s => s.name.toLowerCase()).join(", ")} 
                  may indicate a common viral infection. Please consult with a healthcare 
                  professional for an accurate diagnosis and appropriate treatment plan.
                </span>
              ) : (
                <span className="block mt-2">
                  No symptoms have been logged yet. Add symptoms above to receive 
                  potential diagnosis suggestions.
                </span>
              )}
            </p>
          </div>

          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-xl p-6 w-full max-w-md">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Edit Symptom</h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                    aria-label="Close modal"
                  >
                    <IoMdClose className="text-xl" />
                  </button>
                </div>
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    aria-label="Edit symptom name"
                  />
                  <DatePicker
                    selected={editedDate}
                    onChange={(date) => setEditedDate(date)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                    dateFormat="MM/dd/yyyy"
                  />
                  <select
                    value={editedSeverity}
                    onChange={(e) => setEditedSeverity(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  >
                    {severityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option.charAt(0).toUpperCase() + option.slice(1)}
                      </option>
                    ))}
                  </select>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SymptomTracking;
