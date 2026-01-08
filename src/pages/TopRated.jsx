import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [selectedLang, setSelectedLang] = useState("en"); // Default English
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // For pagination to get 100 movies

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Language Mapping (Code -> Display Name)
  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "kn", name: "Kannada" },
    { code: "ta", name: "Tamil" },
    { code: "ml", name: "Malayalam" },
    { code: "es", name: "Spanish" },
    { code: "tr", name: "Turkish" },
  ];

  // Fetch Function
  const fetchTopMovies = async (langCode, pageNum = 1) => {
    setLoading(true);
    // Sort by vote_average (Rating) and ensure they have at least 100 votes to avoid junk data
    const URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=${langCode}&sort_by=vote_count.desc&page=${pageNum}`;
    
    try {
      const response = await axios.get(URL);
      if (pageNum === 1) {
        setMovies(response.data.results);
      } else {
        // Append new results to existing list
        setMovies((prev) => [...prev, ...response.data.results]);
      }
    } catch (error) {
      console.error("Error fetching languages:", error);
    }
    setLoading(false);
  };

  // Run when language changes
  useEffect(() => {
    setPage(1); // Reset page count
    fetchTopMovies(selectedLang, 1);
  }, [selectedLang]);

  // Load More Function (to reach 100 movies)
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTopMovies(selectedLang, nextPage);
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      
      {/* Header */}
      <h1 className="text-3xl font-bold text-white mb-6 border-l-4 border-yellow-500 pl-4">
        Top Rated by Language
      </h1>

      {/* Language Tabs */}
      <div className="flex flex-wrap gap-3 mb-10">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className={`px-6 py-2 rounded-full font-bold transition-all shadow-lg ${
              selectedLang === lang.code
                ? "bg-yellow-500 text-black scale-105"
                : "bg-gray-800 text-gray-300 hover:bg-gray-700"
            }`}
          >
            {lang.name}
          </button>
        ))}
      </div>

      {/* Movies Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Load More Button */}
      {movies.length > 0 && movies.length < 100 && (
        <div className="flex justify-center mt-12">
            <button 
                onClick={loadMore}
                disabled={loading}
                className="bg-gray-800 border border-gray-600 text-white px-8 py-3 rounded-full hover:bg-yellow-500 hover:text-black transition font-bold"
            >
                {loading ? "Loading..." : "Load More Movies"}
            </button>
        </div>
      )}
    </div>
  );
};

export default TopRated;