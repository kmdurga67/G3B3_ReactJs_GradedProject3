import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Modal from "react-modal";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/movies/details/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Movie details not found");
        }
        return response.json();
      })
      .then((data) => {
        setMovie(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalStyles = {
    content: {
      width: "500px",
      height: "700px",
      margin: "auto",
    },
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movie) {
    return <div>No movie details found.</div>;
  }

  const {
    posterurl,
    title,
    imdbRating,
    contentRating,
    averageRating,
    duration,
    genres,
    actors,
    releaseDate,
    storyline,
  } = movie;

  return (
    <div className="flex p-4">
      <div className="flex-shrink-0">
        <Link to="/" className="text-blue-500 mb-4 block text-lg">
          Back to Home
        </Link>

        <img
          src={posterurl}
          alt={title}
          className="w-[400px] h-cover object-cover rounded-md mb-4 cursor-pointer transition-transform duration-300 transform hover:scale-105"
          onClick={openModal}
        />
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Zoomed Image"
          style={modalStyles}
        >
          <img
            src={posterurl}
            alt={title}
            className="w-[600px] h-[600px] object-cover rounded-md"
          />
          <button onClick={closeModal}>Close</button>
        </Modal>
      </div>
      <div className="ml-12 space-x-2 tracking-wider">
        <h2 className="text-6xl font-bold mb-5 mt-20">{title}</h2>
        <div className="text-2xl">
          <p>
            IMDb Rating: <span className="ml-28">{imdbRating}</span>
          </p>
          <p>
            Content Rating: <span className="ml-20">{contentRating}</span>
          </p>
          <p>
            Average Rating: <span className="ml-20">{averageRating}</span>
          </p>
          <p>
            Duration: <span className="ml-40">{duration}</span>
          </p>

          <p>
            Genres: <span className="ml-40">{genres.join(", ")}</span>
          </p>
          <p>
            Actors: <span className="ml-40">{actors.join(", ")}</span>
          </p>
          <p>
            Release Date: <span className="ml-24">{releaseDate}</span>
          </p>
          <p>
            Story Line: <span className="ml-24">{storyline}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
