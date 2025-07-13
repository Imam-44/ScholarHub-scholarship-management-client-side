// src/components/HomeExtraSections.jsx
import React from 'react';

const featuredUniversities = [
  {
    name: 'Harvard University',
    logo: 'https://i.ibb.co/7gH2ZYC/harvard-logo.png',
    country: 'USA',
  },
  {
    name: 'University of Oxford',
    logo: 'https://upload.wikimedia.org/wikipedia/en/e/ee/Oxford_University_Circlet.svg',
    country: 'UK',
  },
  {
    name: 'University of Tokyo',
    logo: 'https://upload.wikimedia.org/wikipedia/en/8/8e/University_of_Tokyo_Logo.svg',
    country: 'Japan',
  },
  {
    name: 'Chittagong University',
    logo: 'https://upload.wikimedia.org/wikipedia/en/5/5e/University_of_Chittagong_Logo.svg',
    country: 'Bangladesh',
  },
];

const benefits = [
  {
    icon: '🎓',
    title: 'Top Scholarships',
    description: 'Find scholarships with low fees and great benefits easily.',
  },
  {
    icon: '⚡',
    title: 'Fast Application',
    description: 'Apply online quickly and track your applications.',
  },
  {
    icon: '💬',
    title: 'Reliable Reviews',
    description: 'Read honest reviews from previous applicants.',
  },
  {
    icon: '🔒',
    title: 'Secure Payments',
    description: 'Safe payment process integrated with Stripe.',
  },
];

const Hi = () => {
  return (
    <div className="my-12 px-6">
      {/* Featured Universities Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-amber-600">Featured Universities</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {featuredUniversities.map((uni) => (
            <div
              key={uni.name}
              className="flex flex-col items-center bg-white rounded-lg shadow-md p-4 hover:shadow-amber-400 transition-shadow"
            >
              <img
                src={uni.logo}
                alt={uni.name}
                className="w-24 h-24 object-contain mb-3"
              />
              <p className="font-semibold text-center">{uni.name}</p>
              <p className="text-sm text-gray-500">{uni.country}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 text-amber-600">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {benefits.map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-amber-400 transition-shadow text-center"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hi;
