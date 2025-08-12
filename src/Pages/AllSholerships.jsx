import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import ScholarshipCard from '../Components/ScholarshipCard';
import LoadingSpinner from '../Components/LoadingSpinnerSecond';


const AllScholarships = () => {
  const [searchText, setSearchText] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const limit = 6; 
  
  const { data, isLoading, isError } = useQuery({
    queryKey: ['scholarships', query, page],
    queryFn: async () => {
      const baseURL = import.meta.env.VITE_API_URL;
      if (query) {
        // search ignores pagination
        const res = await axios.get(`${baseURL}/api/search-scholarship?query=${query}`);
        return { scholarships: res.data, totalPages: 1 };
      } else {
        // paginated fetch
        const res = await axios.get(`${baseURL}/api/scholarship?page=${page}&limit=${limit}`);
        return {
          scholarships: res.data.scholarships,
          totalPages: res.data.totalPages
        };
      }
    },
    keepPreviousData: true
  });

  const scholarships = data?.scholarships || [];
  const totalPages = data?.totalPages || 1;

  const handleSearch = e => {
    e.preventDefault();
    setPage(1);
    setQuery(searchText.trim());
  };

  return (
    <div className="container mx-auto p-4">
      {/* Search Box */}
      <form onSubmit={handleSearch} className="flex items-center gap-2 mb-6 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search by name, university, or degree"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-amber-500 to-amber-700 hover:from-red-950 hover:to-red-900 text-white px-4 py-2.5 rounded-md shadow transition"
        >
          <FaSearch />
        </button>
      </form>

      {/* Loading / Error */}
      {isLoading && <LoadingSpinner/>}
      {/* {isError && <p className="text-center text-red-500">Failed to load scholarships.</p>} */}

      {/* Scholarships List */}
      {scholarships.length > 0 ? (
        <>
          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {scholarships.map(s => (
              <ScholarshipCard key={s._id} scholarship={s} />
            ))}
          </div>

          {/* Pagination Controls (only when not searching) */}
          
          {!query && totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                onClick={() => setPage(old => Math.max(1, old - 1))}
                disabled={page === 1}
                className={`px-4 py-2 rounded-md transition font-medium ${page === 1
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-amber-700 text-white hover:from-red-800 hover:to-red-900 cursor-pointer'
                  }`}
              >
                Prev
              </button>

              {/* Page Number Display */}
              <span className="text-lg font-semibold px-3">
                Page <span className="text-amber-600">{page}</span> of{' '}
                <span className="text-amber-600">{totalPages}</span>
              </span>

              <button
                onClick={() => setPage(old => Math.min(totalPages, old + 1))}
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-md transition font-medium ${page === totalPages
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-amber-700 text-white hover:from-red-800 hover:to-red-900 cursor-pointer'
                  }`}
              >
                Next
              </button>
            </div>
          )}

        </>
      ) : (
        !isLoading && (
          <div className="text-center mt-20">
            <img src="/no-data.svg" alt="No scholarship found" className="w-60 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No scholarships found.</p>
            <button
              onClick={() => {
                setQuery('');
                setSearchText('');
                setPage(1);
              }}
              className="mt-4 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-red-950 hover:to-red-900 text-white px-6 py-2 rounded-lg shadow transition"
            >
              See All Scholarships
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default AllScholarships;
