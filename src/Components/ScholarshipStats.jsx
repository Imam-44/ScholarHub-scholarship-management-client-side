import React, { useEffect, useState } from "react";
import { FaGraduationCap, FaUniversity, FaClipboardCheck, FaUsers } from "react-icons/fa";

const statsData = [
  { id: 1, icon: <FaGraduationCap size={40} />, number: 1250, label: "Students Applied" },
  { id: 2, icon: <FaClipboardCheck size={40} />, number: 950, label: "Approved Applications" },
  { id: 3, icon: <FaUniversity size={40} />, number: 120, label: "Partner Universities" },
  { id: 4, icon: <FaUsers size={40} />, number: 3500, label: "Total Users" },
];

const Counter = ({ number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = number;
    const duration = 4000; // 2 seconds
    const incrementTime = Math.floor(duration / end);

    const counter = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(counter);
    }, incrementTime);

    return () => clearInterval(counter);
  }, [number]);

  return <span>{count.toLocaleString()}</span>;
};

const ScholarshipStats = () => {
  return (
    <section className="bg-gradient-to-br from-red-900 via-red-950 to-black py-16 px-6 md:px-12 my-16 rounded-3xl shadow-2xl">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-white">Our Achievements</h2>
        <p className="text-amber-100 mt-3 max-w-2xl mx-auto text-lg">
          See how our platform has helped students achieve their scholarship dreams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="bg-black/20 backdrop-blur-md border border-red-800 rounded-2xl shadow-md hover:shadow-amber-500/30 transition transform hover:scale-[1.03] p-8"
          >
            <div className="text-amber-400 mb-4">{stat.icon}</div>
            <h3 className="text-4xl font-extrabold text-amber-400 mb-2">
              <Counter number={stat.number} />
            </h3>
            <p className="text-amber-100 text-lg">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScholarshipStats;
