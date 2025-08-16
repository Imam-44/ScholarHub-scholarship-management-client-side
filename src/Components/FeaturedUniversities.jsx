import React from "react";
import { FaUniversity } from "react-icons/fa";

const universities = [
  {
    id: 1,
    name: "Harvard University",
    country: "USA",
    rank: "#1",
    logo: "https://i.ibb.co.com/B5X6pvxS/uni-4825471-1280.jpg",
  },
  {
    id: 2,
    name: "University of Oxford",
    country: "UK",
    rank: "#2",
    logo: "https://i.ibb.co.com/bjLRynmy/college-5757815-1280.jpg",
  },
  {
    id: 3,
    name: "National University of Singapore",
    country: "Singapore",
    rank: "#8",
    logo: "https://i.ibb.co.com/N2YzQVQt/mansion-4751778-1280.jpg",
  },
  {
    id: 4,
    name: "University of Tokyo",
    country: "Japan",
    rank: "#15",
    logo: "https://i.ibb.co.com/nN0dfn2z/shanghai-jiao-tong-university-4569262-1280.jpg",
  },
];

const FeaturedUniversities = () => {
  return (
    <section className="bg-gradient-to-br from-red-900 via-red-950 to-black py-16 px-6 md:px-12 my-16 rounded-3xl shadow-2xl">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-extrabold text-white flex items-center justify-center gap-3">
          <FaUniversity className="text-amber-400" size={30} />
          Top Universities
        </h2>
        <p className="text-amber-100 mt-3 max-w-2xl mx-auto text-lg">
          Discover top universities offering scholarships around the world.
        </p>
      </div>

      {/* Carousel */}
      <div className="flex overflow-x-auto gap-8 pb-4 snap-x snap-mandatory">
        {universities.map((uni) => (
          <div
            key={uni.id}
            className="snap-center flex-shrink-0 w-72 bg-black/20 backdrop-blur-md border border-red-800 rounded-2xl shadow-lg hover:shadow-amber-500/40 transition transform hover:-translate-y-2 p-6 text-center"
          >
            {/* Logo */}
            <div className="mb-6">
              <img
                src={uni.logo}
                alt={uni.name}
                className="w-32 h-32 object-cover mx-auto rounded-full border-2 border-amber-400 bg-black"
              />
            </div>

            <h3 className="font-bold text-2xl text-amber-400">{uni.name}</h3>
            <p className="text-sm text-amber-200">{uni.country}</p>
            <p className="text-sm font-medium text-amber-300 mt-1">
              World Rank: {uni.rank}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedUniversities;
