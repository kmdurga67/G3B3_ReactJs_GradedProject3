import React from "react";
import { Link } from "react-router-dom";

const FavoriteList = ({ favoriteMovies, onRemoveFromFavorites }) => {
  return (
    <div>
      {favoriteMovies && favoriteMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {favoriteMovies.map((movie) => (
            <div key={movie.id} className="bg-white p-4 rounded-md shadow-md">
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.posterurl}
                  alt={movie.title}
                  className="w-full h-72 object-cover mb-2 rounded-md"
                />
                <p className="text-lg font-semibold">{movie.title}</p>
              </Link>
              <button
                onClick={() => onRemoveFromFavorites(movie.id)}
                className="bg-red-300 text-white px-2 py-2 rounded-md float-right hover:bg-red-600"
              >
                Remove from Favorites ❌
              </button>
            </div>
          ))}
        </div>
      ) : (
        <h1 className="bg-red-500 text-center items-center text-7xl m-64 p-24">
          No Data Found
        </h1>
      )}
    </div>
  );
};

export default FavoriteList;
