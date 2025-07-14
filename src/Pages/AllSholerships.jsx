import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import axios from 'axios';
import ScholarshipCard from '../Components/ScholarshipCard';
const AllScholarships = () => {
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');

  // Fetch scholarships (with optional search)


  const { data: scholarships = [], isLoading, isError } = useQuery({
    queryKey: ['search-scholarship', query],
    queryFn: async () => {
      const baseURL = import.meta.env.VITE_API_URL;
      const url = query
        ? `${baseURL}/search-scholarship?query=${query}`
        : `${baseURL}/scholarship`;
      const res = await axios.get(url);

      return query ? res.data : res.data.scholarships;
    },
  });




  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchText.trim());
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Box */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 mb-6 max-w-md mx-auto"
      >
        <input
          type="text"
          placeholder="Search by name, university, or degree"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <FaSearch />
        </button>
      </form>

      {/* Loading or Error */}
      {isLoading && <p className="text-center">Loading scholarships...</p>}
      {isError && <p className="text-center text-red-500">Failed to load scholarships.</p>}

      {/* Scholarships List */}
      {scholarships.length > 0 ? (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {scholarships.map((scholarship) => (
            <ScholarshipCard key={scholarship._id} scholarship={scholarship}/>

          ))}
        </div>
      ) : (
        !isLoading && (
          <div className="text-center mt-20">
            <img
              src="/no-data.svg"
              alt="No scholarship found"
              className="w-60 mx-auto mb-4"
            />
            <p className="text-gray-500 text-lg">No scholarships found for your search.</p>
          </div>
        )
      )}
    </div>
  );
};

export default AllScholarships;
