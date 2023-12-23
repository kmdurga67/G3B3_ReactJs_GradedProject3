import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const MovieList = ({ type, onAddToFavorites, data }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const url = `http://localhost:5000/api/movies/${type}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => toast.error("Error fetching movies:", error));
  }, [type]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {movies && !data ? (
        movies.map((movie) => (
          <div key={movie.id} className="bg-white p-4 rounded-md shadow-md">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={movie.posterurl}
                alt={movie.title}
                className="w-full h-64 object-cover mb-2 rounded-md"
              />
              <p className="text-lg font-semibold">{movie.title}</p>
            </Link>
            <button
              onClick={() => onAddToFavorites(movie)}
              className="bg-blue-400 text-white px-2 py-2 rounded-md hover:bg-blue-600 float-right"
            >
              Add to Favorites ❣️
            </button>
          </div>
        ))
      ) : data ? (
        data.map((movie) => (
          <div key={movie.id} className="bg-white p-4 rounded-md shadow-md">
            <Link to={`/movie/${movie.id}`}>
              <img
                src={movie.posterurl}
                alt={movie.title}
                className="w-full h-48 object-cover mb-2 rounded-md"
              />
              <p className="text-lg font-semibold">{movie.title}</p>
            </Link>
            <button
              onClick={() => onAddToFavorites(movie)}
              className="bg-blue-400 text-white px-2 py-2 rounded-md hover:bg-blue-600"
            >
              Add to Favorites ❣️
            </button>
          </div>
        ))
      ) : (
        <h1 className="bg-red-500 text-center items-center text-7xl m-64 p-24">
          No Data Found
        </h1>
      )}
    </div>
  );
};

export default MovieList;
