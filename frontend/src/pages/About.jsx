import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-extrabold sm:text-7xl text-slate-600">
            About Us
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover the future of real estate with{" "}
            <span className="font-semibold text-slate-500">
              Your Dream Estate
            </span>
            . Where technology meets trust, and your dreams find their home.
          </p>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-100 hover:bg-gray-200 p-6 rounded-lg shadow-sm transition-transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-slate-600 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              To redefine real estate by delivering innovative solutions and
              creating lasting relationships with our clients.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-gray-100 hover:bg-gray-200 p-6 rounded-lg shadow-sm transition-transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-slate-600 mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              A world where finding your dream home is effortless, reliable, and
              enjoyable, powered by cutting-edge technology.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-gray-100 hover:bg-gray-200 p-6 rounded-lg shadow-sm transition-transform hover:scale-105">
            <h2 className="text-2xl font-semibold text-slate-600 mb-4">
              Why Choose Us?
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              We combine market expertise with a personalized approach, ensuring
              every client’s journey is unique and memorable.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-gray-100 p-8 rounded-lg shadow-sm flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
            <h3 className="text-3xl font-bold text-slate-600">000</h3>
            <p className="text-gray-700">Years of Experience</p>
          </div>
          <div className="mb-6 md:mb-0">
            <h3 className="text-3xl font-bold text-slate-600">000</h3>
            <p className="text-gray-700">Properties Sold</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-slate-600">000</h3>
            <p className="text-gray-700">Happy Clients</p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-slate-600 text-center mb-8">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 text-sm sm:text-base italic">
                "Your Dream Estate made the process of finding my dream home
                seamless and enjoyable. Highly recommended!"
              </p>
              <h4 className="mt-4 text-slate-600 font-semibold">- Alex Johnson</h4>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 text-sm sm:text-base italic">
                "Professional, trustworthy, and highly knowledgeable team. They
                exceeded my expectations!"
              </p>
              <h4 className="mt-4 text-slate-600 font-semibold">
                - Sarah Williams
              </h4>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 text-sm sm:text-base italic">
                "A truly remarkable experience! They made everything easy and
                stress-free."
              </p>
              <h4 className="mt-4 text-slate-600 font-semibold">- John Doe</h4>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 text-sm sm:text-base mb-4">
            Ready to make your dream home a reality?
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
