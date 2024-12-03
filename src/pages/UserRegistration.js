import React, { useState } from "react";
import { FiUpload } from "react-icons/fi";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const UserRegistration = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    description: "",
    profilePicture: null
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const commonDomains = ["@gmail.com", "@yahoo.com", "@outlook.com", "@hotmail.com"];
  const [showSuggestions, setShowSuggestions] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);

    if (name === "email" && !value.includes("@")) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          newErrors[name] = "This field is required";
        } else {
          delete newErrors[name];
        }
        break;
      case "email":
        if (!validateEmail(value)) {
          newErrors.email = "Invalid email format";
        } else {
          delete newErrors.email;
        }
        break;
      case "dob":
        if (!value) {
          newErrors.dob = "Please select your date of birth";
        } else {
          delete newErrors.dob;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key]);
    });

    if (Object.keys(errors).length === 0) {
      try {
        // Simulating API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        console.log("Form submitted:", formData);
        navigate("/")
        setLoading(false);
      } catch (error) {
        console.error("Error submitting form:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  };

  const applySuggestion = (domain) => {
    const emailWithoutDomain = formData.email.split("@")[0];
    setFormData({ ...formData, email: emailWithoutDomain + domain });
    setShowSuggestions(false);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 hover:border-blue-500 transition-all duration-300">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <FiUpload className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Upload profile picture"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${errors.firstName ? "border-red-500" : "border-gray-300"}`}
                aria-invalid={errors.firstName ? "true" : "false"}
                aria-describedby={errors.firstName ? "firstName-error" : undefined}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600" id="firstName-error">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${errors.lastName ? "border-red-500" : "border-gray-300"}`}
                aria-invalid={errors.lastName ? "true" : "false"}
                aria-describedby={errors.lastName ? "lastName-error" : undefined}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600" id="lastName-error">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="relative">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${errors.email ? "border-red-500" : "border-gray-300"}`}
              aria-invalid={errors.email ? "true" : "false"}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {showSuggestions && (
              <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
                {commonDomains.map((domain) => (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => applySuggestion(domain)}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                  >
                    {formData.email.split("@")[0] + domain}
                  </button>
                ))}
              </div>
            )}
            {errors.email && (
              <p className="mt-1 text-sm text-red-600" id="email-error">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-300 ${errors.dob ? "border-red-500" : "border-gray-300"}`}
              aria-invalid={errors.dob ? "true" : "false"}
              aria-describedby={errors.dob ? "dob-error" : undefined}
            />
            {errors.dob && (
              <p className="mt-1 text-sm text-red-600" id="dob-error">{errors.dob}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              About You
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              aria-label="Description about yourself"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <FaSpinner className="w-5 h-5 animate-spin" />
            ) : (
              "Save Profile"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;