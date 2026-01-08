

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard';

const Home = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [selectedGenre, setSelectedGenre] = useState(null); // Filter state
  
  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  // Genre List for Buttons
  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 27, name: "Horror" },
    { id: 10749, name: "Romance" },
    { id: 53, name: "Thriller" },
  ];

  // 1. Fetch Trending or Genre Specific
  useEffect(() => {
    const fetchData = async () => {
       let URL = "";
       
       if (selectedGenre) {
         // Fetch by Genre
         URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${selectedGenre}`;
       } else {
         // Fetch Trending
         URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;
       }

       const response = await axios.get(URL);
       setResults(response.data.results);
       
       // Only set banner if not filtering (optional preference)
       if(!selectedGenre && response.data.results.length > 0) {
         setFeatured(response.data.results[0]);
       }
    };
    fetchData();
  }, [selectedGenre]); // Re-run when genre changes

  // 2. Search Function
  const handleSearch = async (e) => {
    e.preventDefault();
    if(!query) return;

    // Reset genre when searching
    setSelectedGenre(null);

    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
    try {
      const response = await axios.get(URL);
      setResults(response.data.results);
      setFeatured(null); 
    } catch(err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen pb-10">
      
      {/* HERO SECTION */}
      {featured && !query && !selectedGenre && (
        <div 
            className="relative h-[500px] w-full bg-cover bg-center flex items-end"
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${featured.backdrop_path})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
            <div className="relative z-10 p-10 max-w-4xl">
                <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4">{featured.title}</h1>
                <p className="text-gray-200 text-lg line-clamp-3 mb-6">{featured.overview}</p>
            </div>
        </div>
      )}

      {/* SEARCH & FILTER SECTION */}
      <div className={`container mx-auto px-4 relative z-20 ${!query && !selectedGenre && featured ? "-mt-8" : "mt-24"}`}>
        
        {/* Search Input */}
        <form onSubmit={handleSearch} className="flex justify-center shadow-2xl mb-6">
            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full max-w-2xl px-6 py-4 rounded-l-full bg-gray-800 text-white text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
            />
            <button type="submit" className="bg-blue-600 px-8 py-4 rounded-r-full font-bold hover:bg-blue-700 transition">
                Search
            </button>
        </form>

        {/* Filter Buttons (Genre Chips) */}
        <div className="flex justify-center gap-4 flex-wrap">
           <button 
             onClick={() => setSelectedGenre(null)}
             className={`px-4 py-2 rounded-full font-semibold transition ${selectedGenre === null ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
           >
             All
           </button>
           {genres.map((genre) => (
             <button
               key={genre.id}
               onClick={() => { setSelectedGenre(genre.id); setQuery(""); }}
               className={`px-4 py-2 rounded-full font-semibold transition ${selectedGenre === genre.id ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-400 hover:bg-gray-700"}`}
             >
               {genre.name}
             </button>
           ))}
        </div>
      </div>

      {/* MOVIE GRID SECTION */}
      <div className="container mx-auto px-4 mt-12">
        <h2 className="text-2xl font-bold border-l-4 border-red-500 pl-3 mb-6">
            {query ? `Results for "${query}"` : selectedGenre ? "Filtered Results" : "Trending Now"}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {results.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
      </div>

    </div>
  );
};

export default Home;