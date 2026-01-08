import React from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import MovieCard from '../components/MovieCard';

const Watchlist = () => {
  const { watchlist } = useGlobalContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-blue-500 pl-4">My Favorites</h1>
      
      {watchlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} movie={movie} type="watchlist" />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-20">
            <h2 className="text-2xl">No movies in your list yet!</h2>
            <p>Go back to home and add some.</p>
        </div>
      )}
    </div>
  );
};

export default Watchlist;