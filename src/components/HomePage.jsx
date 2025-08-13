import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { countries } from '../data/countries';

const HomePage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredCountry: '',
    course: '',
    preferredIntake: ''
  });

  // Show popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setShowPopup(false);
    setFormData({ name: '', email: '', phone: '', preferredCountry: '', course: '', preferredIntake: '' });
    
    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Success Message */}
      {showSuccess && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-bounce">
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            <span>Thank you! We'll contact you soon.</span>
          </div>
        </div>
      )}

      {/* Popup Registration Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">🌍 Start Your Study Abroad Journey!</h3>
                <button onClick={closePopup} className="text-gray-400 hover:text-gray-600 text-2xl">
                  ×
                </button>
              </div>
              <p className="text-gray-600 mb-4">
                Get FREE personalized guidance for studying abroad. Choose from 6 amazing countries!
              </p>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Country</label>
                  <select
                    name="preferredCountry"
                    value={formData.preferredCountry}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a country</option>
                    {Object.entries(countries).map(([code, country]) => (
                      <option key={code} value={country.name}>
                        {country.flag} {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-semibold"
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

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl mr-2">🌍</span>
              <h1 className="text-xl font-bold text-gray-900">Study Abroad</h1>
            </div>
            <div className="flex space-x-4">
              <a href="#countries" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Countries
              </a>
              <a href="#about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                About
              </a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                Contact
              </a>
              <button 
                onClick={() => setShowPopup(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Get Free Consultation
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Your Gateway to Global Education</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover world-class universities, diverse cultures, and endless opportunities. 
            Choose from 6 amazing countries and start your international education journey today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a 
              href="#countries" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Explore Countries
            </a>
            <button 
              onClick={() => setShowPopup(true)}
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              🎯 Get Free Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">6</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Universities</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1000+</div>
              <div className="text-gray-600">Students Placed</div>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Grid */}
      <section id="countries" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Study Destination</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each country offers unique opportunities, world-class education, and unforgettable experiences. 
              Click on any country to explore detailed information about courses, universities, and admission processes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(countries).map(([code, country]) => (
              <Link
                key={code}
                to={`/studyabroad/${code}`}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200"
              >
                <div className="relative h-48 bg-cover bg-center rounded-t-xl" style={{ backgroundImage: `url(${country.heroImage})` }}>
                  <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  <div className="absolute top-4 right-4 text-4xl">{country.flag}</div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold">{country.name}</h3>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{country.tagline}</h4>
                  <p className="text-gray-600 mb-4 line-clamp-3">{country.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="text-sm font-semibold text-gray-700 mb-2">Popular Courses:</h5>
                    <div className="flex flex-wrap gap-1">
                      {country.popularCourses.slice(0, 3).map((course, index) => (
                        <span key={index} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                          {course.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {country.popularCourses.length} courses available
                    </span>
                    <span className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors">
                      Learn More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Study Abroad?</h2>
            <p className="text-xl text-gray-600">Discover the benefits of international education</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">World-Class Education</h3>
              <p className="text-gray-600">Access top-ranked universities and cutting-edge research facilities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Network</h3>
              <p className="text-gray-600">Build international connections and expand your professional network</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Career Opportunities</h3>
              <p className="text-gray-600">Enhanced job prospects with international experience and qualifications</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Personal Growth</h3>
              <p className="text-gray-600">Develop independence, cultural awareness, and life skills</p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Real students, real success stories</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-bold">P</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Priya Sharma</h4>
                  <p className="text-sm text-gray-600">MBA from UK</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"Studying abroad changed my life. I got a job at a top consulting firm and now work with clients worldwide."</p>
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-green-600 font-bold">A</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Ahmed Khan</h4>
                  <p className="text-sm text-gray-600">Computer Science from Canada</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"The practical approach to learning and industry connections helped me secure a great job after graduation."</p>
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-purple-600 font-bold">M</span>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Maria Garcia</h4>
                  <p className="text-sm text-gray-600">Nursing from Australia</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">"The healthcare education system here is world-class. I feel well-prepared for my career in nursing."</p>
              <div className="flex text-yellow-400">
                ★★★★★
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-blue-100">Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Universities</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-blue-100">Courses</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-100">Students Placed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Get personalized guidance and start your study abroad adventure today. 
            Our expert counselors are here to help you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => setShowPopup(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              🎯 Get Free Consultation
            </button>
            <a 
              href="tel:+12345678900" 
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Call Now: +1-234-567-8900
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Study Abroad</h3>
              <p className="text-gray-400">Your gateway to international education and global opportunities.</p>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Popular Countries</h4>
              <ul className="space-y-2 text-gray-400">
                {Object.keys(countries).slice(0, 3).map((code) => (
                  <li key={code}>
                    <Link to={`/studyabroad/${code}`} className="hover:text-white transition-colors">
                      {countries[code].name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>University Applications</li>
                <li>Visa Assistance</li>
                <li>Test Preparation</li>
                <li>Career Counseling</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: info@studyabroad.com</li>
                <li>Phone: +1-234-567-8900</li>
                <li>Address: Global Education Center</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Study Abroad. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
