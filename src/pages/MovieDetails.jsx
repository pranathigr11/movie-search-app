import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaPlay, FaStar } from 'react-icons/fa';

const MovieDetails = () => {
  const { id } = useParams(); // Get movie ID from URL
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
      
      // 1. Fetch Movie Info
      const { data: movieData } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
      );
      setMovie(movieData);

      // 2. Find Trailer (Youtube)
      const officialTrailer = movieData.videos.results.find(
        (vid) => vid.name.includes("Official Trailer") || vid.type === "Trailer"
      );
      setTrailer(officialTrailer ? officialTrailer.key : null);

      // 3. Get Top 5 Cast Members
      setCast(movieData.credits.cast.slice(0, 6));
    };

    fetchDetails();
  }, [id]);

  if (!movie) return <div className="text-white text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* 1. HERO BACKDROP */}
      <div 
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 p-8 w-full max-w-4xl">
           <h1 className="text-5xl font-extrabold mb-4">{movie.title}</h1>
           <div className="flex items-center gap-4 text-sm font-semibold mb-4">
              <span className="text-yellow-400 flex items-center gap-1"><FaStar /> {movie.vote_average.toFixed(1)}</span>
              <span>{movie.release_date.split("-")[0]}</span>
              <span>{movie.runtime} min</span>
              {movie.genres.map(g => (
                <span key={g.id} className="border border-gray-500 px-2 py-1 rounded-full text-xs">
                  {g.name}
                </span>
              ))}
           </div>
           
           {trailer && (
             <a 
               href={`https://www.youtube.com/watch?v=${trailer}`} 
               target="_blank" 
               rel="noreferrer"
               className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded font-bold inline-flex items-center gap-2 transition"
             >
               <FaPlay size={14}/> Watch Trailer
             </a>
           )}
        </div>
      </div>

      {/* 2. CONTENT SECTION */}
      <div className="container mx-auto px-6 py-10 grid md:grid-cols-3 gap-10">
        
        {/* Left: Overview */}
        <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 border-l-4 border-blue-500 pl-3">Plot Summary</h2>
            <p className="text-gray-300 leading-relaxed text-lg mb-8">{movie.overview}</p>

            <h2 className="text-2xl font-bold mb-4 border-l-4 border-blue-500 pl-3">Top Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              {cast.map(actor => (
                <div key={actor.id} className="min-w-[100px] text-center">
                  {actor.profile_path ? (
                    <img 
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`} 
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-2 border-2 border-gray-700"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-2"></div>
                  )}
                  <p className="text-sm font-bold">{actor.name}</p>
                  <p className="text-xs text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
        </div>

        {/* Right: Info Box */}
        <div className="bg-gray-800 p-6 rounded-xl h-fit">
            <h3 className="text-xl font-bold mb-4">Movie Info</h3>
            <div className="space-y-4 text-sm text-gray-300">
                <p><strong className="text-white">Status:</strong> {movie.status}</p>
                <p><strong className="text-white">Budget:</strong> ${movie.budget.toLocaleString()}</p>
                <p><strong className="text-white">Revenue:</strong> ${movie.revenue.toLocaleString()}</p>
                <p><strong className="text-white">Language:</strong> {movie.original_language.toUpperCase()}</p>
            </div>
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;