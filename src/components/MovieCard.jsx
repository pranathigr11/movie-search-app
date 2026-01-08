


import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { FaHeart, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie, type }) => {
  const { addMovieToWatchlist, removeMovieFromWatchlist, watchlist } = useGlobalContext();

  // check if movie is already in watchlist
  let storedMovie = watchlist.find((o) => o.id === movie.id);
  const watchlistDisabled = storedMovie ? true : false;

  const IMG_PATH = "https://image.tmdb.org/t/p/w500";

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
      
      <div className="relative group">
        {/* 1. WRAP IMAGE IN LINK */}
        <Link to={`/movie/${movie.id}`}>
          {movie.poster_path ? (
            <img
              src={`${IMG_PATH}${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-80 object-cover" 
            />
          ) : (
            <div className="w-full h-80 bg-gray-700 flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </Link>

        {/* Hover Overlay with Button (This stays OUTSIDE the Link so buttons work properly) */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none">
             <div className="pointer-events-auto">
                 {/* We added pointer-events-auto to the button wrapper so clicks work here */}
                 {type === "watchlist" ? (
                    <button 
                      onClick={(e) => {
                        e.preventDefault(); // Safety check
                        removeMovieFromWatchlist(movie.id);
                      }}
                      className="bg-red-600 text-white p-3 rounded-full hover:bg-red-700 transition"
                      title="Remove"
                    >
                      <FaTimes size={20} />
                    </button>
                ) : (
                    <button
                      disabled={watchlistDisabled}
                      onClick={(e) => {
                        e.preventDefault(); // Safety check
                        addMovieToWatchlist(movie);
                      }}
                      className={`p-3 rounded-full transition ${watchlistDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 text-white"}`}
                      title="Add to Favorites"
                    >
                      <FaHeart size={20} />
                    </button>
                )}
             </div>
        </div>
      </div>

      {/* Movie Info Section */}
      <div className="p-4">
        {/* 2. WRAP TITLE IN LINK */}
        <Link to={`/movie/${movie.id}`}>
            <h3 className="text-lg font-bold truncate text-white hover:text-blue-400 transition" title={movie.title}>
                {movie.title}
            </h3>
        </Link>

        <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-400">
                {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
            </span>
            <span className={`text-xs font-bold px-2 py-1 rounded ${
                movie.vote_average >= 7 ? "bg-green-900 text-green-400" : "bg-yellow-900 text-yellow-400"
            }`}>
                {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
            </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;