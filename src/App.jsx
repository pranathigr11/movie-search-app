

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import Home from './pages/Home';
import Watchlist from './pages/Watchlist';
import MovieDetails from './pages/MovieDetails'; 
import TopRated from './pages/TopRated';

function App() {
  return (
    <GlobalProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          
          {/* Simple Header */}
          <header className="bg-gray-800 p-4 shadow-lg sticky top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
              <Link to="/" className="text-2xl font-bold text-blue-500">
                Cinema<span className="text-white">Search</span>
              </Link>
              <div className="flex gap-4">
                <Link to="/" className="hover:text-blue-400 transition">Home</Link>
                <Link to="/top-rated" className="hover:text-yellow-400 transition font-medium">Top Rated</Link> {/* <--- 2. ADD LINK */}
                <Link to="/watchlist" className="hover:text-blue-400 transition">Favorites</Link>
              </div>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/top-rated" element={<TopRated />} /> {/* <--- 3. ADD ROUTE */}
        
          </Routes>
          
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;