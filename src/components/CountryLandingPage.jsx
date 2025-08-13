import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { countries } from "../data/countries";

const CountryLandingPage = () => {
  const { countryCode } = useParams();
  const country = countries[countryCode];
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course: "",
    country: country?.name || "",
    preferredIntake: "",
    budget: "",
    currentEducation: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Show popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!country) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4">
            Country Not Found
          </h1>
          <p className="text-gray-600 mb-8 text-sm sm:text-base">
            The requested country page doesn't exist.
          </p>
          <Link
            to="/studyabroad/uk"
            className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Go to UK Page
          </Link>
        </div>
      </div>
    );
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setShowSuccess(true);
    setShowPopup(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      course: "",
      country: country.name,
      preferredIntake: "",
      budget: "",
      currentEducation: "",
    });

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 left-4 right-4 sm:right-auto sm:left-auto sm:right-4 bg-green-500 text-white px-4 sm:px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            <span className="text-sm sm:text-base">Thank you! We'll contact you soon.</span>
          </div>
        </div>
      )}

      {/* Popup Registration Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                  🎓 Get Free Study Abroad Consultation!
                </h3>
                <button
                  onClick={closePopup}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
              <p className="text-sm sm:text-base text-gray-600 mb-4">
                Limited time offer! Get personalized guidance for studying in{" "}
                {country.name} absolutely FREE.
              </p>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Interested Course
                  </label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  >
                    <option value="">Select a course</option>
                    {country.popularCourses.map((course, index) => (
                      <option key={index} value={course.name}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold text-sm sm:text-base"
                >
                  Get Free Consultation Now!
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-3 text-center">
                * Limited time offer. No obligation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-xl sm:text-2xl mr-2">{country.flag}</span>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Study Abroad</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-2 lg:space-x-4">
              {Object.keys(countries).map((code) => (
                <Link
                  key={code}
                  to={`/studyabroad/${code}`}
                  className={`px-2 lg:px-3 py-2 rounded-md text-xs lg:text-sm font-medium transition-colors ${
                    countryCode === code
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <span className="hidden lg:inline">{countries[code].flag} {countries[code].name}</span>
                  <span className="lg:hidden">{countries[code].flag}</span>
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-600 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {Object.keys(countries).map((code) => (
                  <Link
                    key={code}
                    to={`/studyabroad/${code}`}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                      countryCode === code
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {countries[code].flag} {countries[code].name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Responsive Hero Section */}
      <section
        className="relative min-h-[60vh] sm:h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${country.heroImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white py-8 sm:py-0">
            <div className="text-4xl sm:text-6xl mb-4">{country.flag}</div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              Study in {country.name}
            </h1>
            <p className="text-lg sm:text-xl mb-4 sm:mb-6 max-w-2xl">{country.tagline}</p>
            <p className="text-base sm:text-lg max-w-2xl mb-6 sm:mb-8 leading-relaxed">{country.description}</p>
            <button
              onClick={() => setShowPopup(true)}
              className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-base sm:text-lg w-full sm:w-auto"
            >
              🎯 Get Free Consultation Now!
            </button>
          </div>
        </div>
      </section>

      {/* Responsive Quick Stats Section */}
      <section className="py-8 sm:py-12 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                {country.popularCourses.length}+
              </div>
              <div className="text-xs sm:text-sm text-blue-100">Courses Available</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                {country.topUniversities.length}+
              </div>
              <div className="text-xs sm:text-sm text-blue-100">Top Universities</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">95%</div>
              <div className="text-xs sm:text-sm text-blue-100">Success Rate</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">24/7</div>
              <div className="text-xs sm:text-sm text-blue-100">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tabs Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Explore comprehensive information about studying in {country.name}
            </p>
          </div>

          {/* Overview Section */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Why Choose {country.name}?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {country.whyStudy.map((reason, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 sm:mr-4 mt-1 flex-shrink-0">
                    <span className="text-blue-600 font-bold text-sm sm:text-base">{index + 1}</span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{reason}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Courses Section */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
              Popular Courses in {country.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {country.popularCourses.map((course, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-shadow border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <h4 className="text-lg sm:text-xl font-semibold text-gray-900 leading-tight">
                      {course.name}
                    </h4>
                    <span className="text-xs sm:text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {course.level}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-gray-600 mb-2">
                    Duration: {course.duration}
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 mb-4">Fees: {course.fees}</p>
                  <button
                    onClick={() => setShowPopup(true)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Universities Section */}
          <div className="mb-12 sm:mb-16">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Top Universities in {country.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Discover world-class institutions that offer exceptional
                education and research opportunities
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {country.topUniversities.map((university, index) => (
                <div
                  key={index}
                  className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 overflow-hidden"
                >
                  {/* University Image */}
                  <div
                    className="relative h-48 sm:h-56 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${university.image})` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-base sm:text-lg border-4 border-white shadow-lg">
                      {index + 1}
                    </div>
                    <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1">
                      <span className="text-xs sm:text-sm font-semibold text-gray-800">
                        #{index + 1} Rank
                      </span>
                    </div>
                  </div>

                  {/* University Info */}
                  <div className="p-4 sm:p-6">
                    <h4
                      className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {university.name}
                    </h4>
                    <div className="flex items-center mb-3 sm:mb-4">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-3 h-3 sm:w-4 sm:h-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm text-gray-600 ml-2">
                        5.0 (World Class)
                      </span>
                    </div>
                    <button
                      onClick={() => setShowPopup(true)}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
                    >
                      View Programs
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Admission Process Section */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-10 text-center">
              Admission Process
            </h3>

            <div className="max-w-4xl mx-auto relative">
              <div className="space-y-6 sm:space-y-8 relative">
                {country.admissionProcess.map((step, index) => (
                  <div key={index} className="flex items-start group relative">
                    {/* Step Number Circle */}
                    <div
                      className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500 to-blue-700 
                          text-white rounded-full flex items-center justify-center font-bold shadow-md
                          group-hover:scale-110 transition-transform duration-300 text-sm sm:text-base"
                    >
                      {index + 1}
                    </div>

                    {/* Connector Line */}
                    {index < country.admissionProcess.length - 1 && (
                      <div className="absolute left-4 sm:left-5 top-8 sm:top-10 w-0.5 h-full bg-blue-300"></div>
                    )}

                    {/* Step Content */}
                    <div
                      className="flex-1 ml-4 sm:ml-6 p-3 sm:p-4 bg-white rounded-xl shadow-sm border border-gray-100
                          group-hover:shadow-md group-hover:border-blue-200 transition-all duration-300"
                    >
                      <p className="text-sm sm:text-base text-gray-700 leading-relaxed">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Costs Section */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-10 text-center">
              Cost of Studying in {country.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Tuition Fees */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-3 sm:p-4">
                  <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                    🎓 Tuition Fees
                  </h4>
                </div>
                <div className="p-4 sm:p-6">
                  {country.popularCourses.slice(0, 3).map((course, index) => (
                    <div key={index} className="mb-3">
                      <p className="text-sm sm:text-base text-gray-800 font-medium">{course.name}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{course.fees}</p>
                    </div>
                  ))}
                  <p className="text-xs sm:text-sm text-gray-500 mt-4 italic">
                    *Varies by university and program
                  </p>
                </div>
              </div>

              {/* Living Expenses */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-green-500 to-green-700 p-3 sm:p-4">
                  <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                    🏠 Living Expenses
                  </h4>
                </div>
                <div className="p-4 sm:p-6">
                  {country.costOfLiving &&
                    Object.entries(country.costOfLiving).map(([key, value]) => (
                      <div key={key} className="mb-3 flex justify-between">
                        <p className="text-sm sm:text-base text-gray-800 capitalize">{key}</p>
                        <span className="text-xs sm:text-sm text-gray-600">{value}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Scholarships */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-purple-500 to-purple-700 p-3 sm:p-4">
                  <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                    🎯 Scholarships
                  </h4>
                </div>
                <div className="p-4 sm:p-6">
                  {country.scholarships &&
                    country.scholarships.map((scholarship, index) => (
                      <p key={index} className="text-sm sm:text-base text-gray-800 mb-3">
                        • {scholarship}
                      </p>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visa Section */}
          <div className="mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6 sm:mb-10 text-center">
              Visa Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Required Documents */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 p-3 sm:p-4">
                  <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                    📄 Required Documents
                  </h4>
                </div>
                <div className="p-4 sm:p-6">
                  <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
                    {country.visaInfo?.documents?.map((doc, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-yellow-500 mt-1">✔</span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visa Details */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-3 sm:p-4">
                  <h4 className="text-base sm:text-lg font-semibold text-white flex items-center gap-2">
                    🛂 Visa Details
                  </h4>
                </div>
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                  <p className="text-sm sm:text-base">
                    <strong className="text-gray-800">Type:</strong>{" "}
                    {country.visaInfo?.type}
                  </p>
                  <p className="text-sm sm:text-base">
                    <strong className="text-gray-800">Processing Time:</strong>{" "}
                    {country.visaInfo?.processingTime}
                  </p>
                  <p className="text-sm sm:text-base">
                    <strong className="text-gray-800">Fees:</strong>{" "}
                    {country.visaInfo?.fees}
                  </p>

                  <button
                    onClick={() => setShowPopup(true)}
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 text-sm sm:text-base"
                  >
                    Get Visa Assistance
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              What Our Students Say
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              Real experiences from students who studied in {country.name}
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                name: "Aisha Patel",
                course: "MBA Student",
                initial: "A",
                color: "blue",
                bgColor: "bg-blue-100",
                textColor: "text-blue-600",
                review: `Studying in ${country.name} has been an incredible experience. The quality of education and the multicultural environment is amazing!`,
              },
              {
                name: "Rahul Sharma",
                course: "Computer Science",
                initial: "R",
                color: "green",
                bgColor: "bg-green-100",
                textColor: "text-green-600",
                review: `The practical approach to learning and industry connections helped me secure a great job after graduation.`,
              },
              {
                name: "Sarah Johnson",
                course: "Nursing",
                initial: "S",
                color: "purple",
                bgColor: "bg-purple-100",
                textColor: "text-purple-600",
                review: `The healthcare education system here is world-class. I feel well-prepared for my career in nursing.`,
              },
            ].map((student, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6 relative overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                {/* Gradient Top Border */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-${student.color}-400 to-${student.color}-600`}
                ></div>

                {/* Avatar + Info */}
                <div className="flex items-center mb-3 sm:mb-4">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 ${student.bgColor} rounded-full flex items-center justify-center mr-3 sm:mr-4`}
                  >
                    <span className={`${student.textColor} font-bold text-base sm:text-lg`}>
                      {student.initial}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
                      {student.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600">{student.course}</p>
                  </div>
                </div>

                {/* Review */}
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
                  "{student.review}"
                </p>

                {/* Rating Stars */}
                <div className="flex text-yellow-400">
                  {Array(5)
                    .fill()
                    .map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className="w-4 h-4 sm:w-5 sm:h-5"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z" />
                      </svg>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Lead Form Section */}
      <section className="py-12 sm:py-16 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-4 sm:mb-6">
              Get personalized guidance for studying in {country.name}
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-blue-100 text-sm sm:text-base">
              <div className="flex items-center justify-center">
                <span className="mr-2">✅</span>
                <span>Free Consultation</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">✅</span>
                <span>No Application Fees</span>
              </div>
              <div className="flex items-center justify-center">
                <span className="mr-2">✅</span>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleFormSubmit}
            className="bg-white rounded-lg shadow-xl p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label
                  htmlFor="course"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Interested Course
                </label>
                <select
                  id="course"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                >
                  <option value="">Select a course</option>
                  {country.popularCourses.map((course, index) => (
                    <option key={index} value={course.name}>
                      {course.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="preferredIntake"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Preferred Intake
                </label>
                <select
                  id="preferredIntake"
                  name="preferredIntake"
                  value={formData.preferredIntake}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                >
                  <option value="">Select intake</option>
                  <option value="September 2024">September 2024</option>
                  <option value="January 2025">January 2025</option>
                  <option value="September 2025">September 2025</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="budget"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Budget Range
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                >
                  <option value="">Select budget</option>
                  <option value="Under $20,000">Under $20,000</option>
                  <option value="$20,000 - $30,000">$20,000 - $30,000</option>
                  <option value="$30,000 - $50,000">$30,000 - $50,000</option>
                  <option value="Above $50,000">Above $50,000</option>
                </select>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold text-base sm:text-lg w-full sm:w-auto"
              >
                🎯 Get Free Consultation Now!
              </button>
              <p className="text-xs sm:text-sm text-gray-500 mt-3">
                * No obligation. We respect your privacy.
              </p>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Study Abroad</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Your gateway to international education and global
                opportunities.
              </p>
            </div>
            <div>
              <h4 className="text-sm sm:text-md font-semibold mb-3 sm:mb-4">Popular Countries</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                {Object.keys(countries)
                  .slice(0, 3)
                  .map((code) => (
                    <li key={code}>
                      <Link
                        to={`/studyabroad/${code}`}
                        className="hover:text-white transition-colors"
                      >
                        {countries[code].name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm sm:text-md font-semibold mb-3 sm:mb-4">Services</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li>University Applications</li>
                <li>Visa Assistance</li>
                <li>Test Preparation</li>
                <li>Career Counseling</li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm sm:text-md font-semibold mb-3 sm:mb-4">Contact</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li>Email: info@studyabroad.com</li>
                <li>Phone: +1-234-567-8900</li>
                <li>Address: Global Education Center</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm sm:text-base text-gray-400">
            <p>&copy; 2024 Study Abroad. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CountryLandingPage;
