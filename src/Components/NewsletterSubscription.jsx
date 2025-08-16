import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

const NewsletterSubscription = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // API call logic can be added here
    toast.success("Your information saved successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
    });
  };

  return (
    <section className="bg-gradient-to-br from-red-900 via-red-950 to-black py-16 px-6 md:px-12 my-16 rounded-3xl shadow-2xl">
      {/* Toast container */}
      {/* <Toaster position="top-right" reverseOrder={false} /> */}

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left: Image */}
        <div className="md:w-1/2">
          <img
            src="https://i.ibb.co.com/sJmjbSmm/shanghai-jiao-tong-university-4486945-1280.jpg"
            alt="Newsletter"
            className="w-full h-[500px] object-cover rounded-2xl shadow-lg border border-red-800"
          />
        </div>

        {/* Right: Form */}
        <div className="md:w-1/2 bg-black/20 backdrop-blur-md border border-red-800 rounded-2xl p-8 shadow-lg">
          <h2 className="text-3xl font-extrabold text-white flex items-center gap-3 mb-4">
            <FaEnvelope className="text-amber-400" />
            Apply Now
          </h2>
          <p className="text-amber-100 mb-6">
            Submit your information to apply for scholarships.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="px-5 py-3 rounded-full border border-red-800 bg-black/20 text-amber-100 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="px-5 py-3 rounded-full border border-red-800 bg-black/20 text-amber-100 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="px-5 py-3 rounded-full border border-red-800 bg-black/20 text-amber-100 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />
            <input
              type="text"
              name="address"
              placeholder="Address (Village, District, Country)"
              value={formData.address}
              onChange={handleChange}
              required
              className="px-5 py-3 rounded-full border border-red-800 bg-black/20 text-amber-100 placeholder-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
            />

            <button
              type="submit"
              className="px-6 py-3 bg-amber-400 text-black font-bold rounded-full hover:bg-amber-500 transition mt-2 cursor-pointer"
            >
              Save Your Information
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSubscription;
