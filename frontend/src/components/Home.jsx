import React from "react";
import { Link } from "react-router-dom";
import { Logo } from "./index";
import { useSelector } from "react-redux";

const HomePage = () => {

  const authStatus = useSelector((state) => state.auth.status)

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4 bg-blue-50">
        <h1 className="text-5xl font-bold mb-4">Welcome to LMS

          <div className="flex justify-center items-center my-6">
            <Logo style={{}} />
          </div>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-xl">
          A modern platform to manage your courses and content seamlessly.
        </p>

        {!authStatus && (
          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700 transition">
            <Link to={'/signup'}>Get Started</Link>
          </button>
        )}

      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {["Easy Management", "Secure Access", "Responsive Design"].map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-md text-center">
              <h3 className="text-xl font-semibold mb-2">{feature}</h3>
              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-100 text-sm text-gray-500">
        © {new Date().getFullYear()} MyWebsite. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
