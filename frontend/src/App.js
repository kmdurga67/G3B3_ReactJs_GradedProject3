import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import FavoriteList from "./components/FavoriteList";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const searchMovies = () => {
    const url = `http://localhost:5000/api/movies/search/${searchTerm}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data);
      })
      .catch((error) => console.error("Error fetching movies:", error));
  };

  const addToFavorites = (movie) => {
    const isAlreadyAdded = favoriteMovies.some(
      (favorite) => favorite.id === movie.id
    );

    if (isAlreadyAdded) {
      toast.error("Already in your favorite List!");
      return;
    }

    fetch(`http://localhost:5000/api/favorites/add/${movie.id}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setFavoriteMovies((prevFavorites) => [
            ...prevFavorites,
            { id: movie.id },
          ]);
          toast.success(`Succesfully Added: ${movie.title}`);
        } else {
          console.error("Error adding movie to favorites:", data.error);
          toast.error(`Error adding to favorites: ${data.error}`);
        }
      })
      .catch((error) => {
        console.error("Error adding movie to favorites:", error);
        toast.error("Error adding to favorites. Please try again.");
      });
  };

  const removeFromFavorites = (movieId) => {
    fetch(`http://localhost:5000/api/favorites/remove/${movieId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Movie removed from favorites:", movieId);
          setFavoriteMovies((prevFavorites) =>
            prevFavorites.filter((movie) => movie.id !== movieId)
          );
          toast.success("Removed from favorites");
        } else {
          console.error("Error removing movie from favorites:", data.error);
          toast.error("Error removing from favorites. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error removing movie from favorites:", error);
        toast.error("Error removing from favorites. Please try again.");
      });
  };

  useEffect(() => {
    const url = "http://localhost:5000/api/favorites";
    fetch(url)
      .then((response) => response.json())
      .then((data) => setFavoriteMovies(data))
      .catch((error) =>
        console.error("Error fetching favorite movies:", error)
      );
  }, []);

  useEffect(() => {
    if (searchTerm) {
      searchMovies(searchTerm);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <div className="bg-gray-100 min-h-screen">
        <nav className="bg-blue-500 p-4 text-blue-600 text-2xl">
          <ul className="flex space-x-4">
            <li className="rounded-md bg-slate-300 p-2 hover:text-green-600 hover:bg-yellow-300">
              <Link to="/">Movies in Theaters</Link>
            </li>
            <li className="rounded-md bg-slate-300 p-2 hover:text-green-600 hover:bg-yellow-300">
              <Link to="/coming-soon">Coming Soon</Link>
            </li>
            <li className="rounded-md bg-slate-300 p-2 hover:text-green-600 hover:bg-yellow-300">
              <Link to="/top-rated-indian">Top Rated Indian</Link>
            </li>
            <li className="rounded-md bg-slate-300 p-2 hover:text-green-600 hover:bg-yellow-300">
              <Link to="/top-rated-movies">Top Rated Movies</Link>
            </li>
            <li className="rounded-md bg-slate-300 p-2 hover:text-green-600 hover:bg-yellow-300">
              <Link to="/favorites">Favourite</Link>
            </li>
            <li>
              <input
                type="text"
                placeholder="Search movie"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 border border-gray-300 rounded-md text-black"
              />
              <button
                className="ml-2 px-4 py-2 rounded-md bg-blue-200"
                onClick={searchMovies}
              >
                🔍
              </button>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route
            path="/"
            element={
              <MovieList
                type="movies-in-theaters"
                data={searchTerm ? searchResults : null}
                onAddToFavorites={addToFavorites}
                favoriteMovies={favoriteMovies}
              />
            }
          />
          <Route
            path="/coming-soon"
            element={
              <MovieList
                type="movies-coming"
                data={searchTerm ? searchResults : null}
                onAddToFavorites={addToFavorites}
                favoriteMovies={favoriteMovies}
              />
            }
          />
          <Route
            path="/top-rated-indian"
            element={
              <MovieList
                type="top-rated-india"
                data={searchTerm ? searchResults : null}
                onAddToFavorites={addToFavorites}
                favoriteMovies={favoriteMovies}
              />
            }
          />
          <Route
            path="/top-rated-movies"
            element={
              <MovieList
                type="top-rated-movies"
                data={searchTerm ? searchResults : null}
                onAddToFavorites={addToFavorites}
                favoriteMovies={favoriteMovies}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoriteList
                favoriteMovies={favoriteMovies}
                onRemoveFromFavorites={removeFromFavorites}
              />
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
