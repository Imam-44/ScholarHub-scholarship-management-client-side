import React from "react";
import { FaGraduationCap, FaLaptopCode, FaSeedling } from "react-icons/fa";

const categories = [
  {
    id: 1,
    name: "Agriculture",
    icon: <FaSeedling size={40} />,
    description: "Scholarships for agricultural studies and research worldwide.",
  },
  {
    id: 2,
    name: "Engineering",
    icon: <FaLaptopCode size={40} />,
    description: "Funding opportunities for engineering students and innovators.",
  },
  {
    id: 3,
    name: "Medical & Doctor",
    icon: <FaGraduationCap size={40} />,
    description: "Scholarships for medical and healthcare-related degrees.",
  },
];

const ScholarshipCategories = () => {
  return (
    <section className="bg-gradient-to-br from-red-900 via-red-950 to-black py-16 px-6 md:px-12 my-16 rounded-3xl shadow-2xl">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-white flex items-center justify-center gap-3">
          Scholarship Categories
        </h2>
        <p className="text-amber-100 mt-3 max-w-2xl mx-auto text-lg">
          Explore different scholarship categories and find the perfect match for your studies.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-black/20 backdrop-blur-md border border-red-800 rounded-2xl shadow-md hover:shadow-amber-500/30 transition transform hover:scale-[1.03] p-8 text-center"
          >
            <div className="mb-6 text-amber-400">{cat.icon}</div>
            <h3 className="font-bold text-2xl text-amber-400 mb-3">{cat.name}</h3>
            <p className="text-amber-100 text-sm">{cat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScholarshipCategories;
