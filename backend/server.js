const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());

const movieData = require("./json/data.json");

let favoriteIds = [];

app.get("/api/movies/:type", (req, res) => {
  const { type } = req.params;

  if (movieData[type]) {
    res.json(movieData[type]);
  } else {
    res.status(404).json({ error: "Type not found" });
  }
});

app.get("/api/movies/search/:name", (req, res) => {
  const { name } = req.params;

  const searchResults = [];
  for (const type in movieData) {
    const moviesOfType = movieData[type].filter((movie) =>
      movie.title.toLowerCase().includes(name.toLowerCase())
    );
    searchResults.push(...moviesOfType);
  }

  res.json(searchResults);
});

app.get("/api/movies/details/:id", (req, res) => {
  const { id } = req.params;
  const movie = findMovieById(id);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

app.get("/api/favorites", (req, res) => {
  const favoriteMovies = favoriteIds
    .map((id) => findMovieById(id))
    .filter(Boolean);
  res.json(favoriteMovies);
});

app.post("/api/favorites/add/:id", (req, res) => {
  const { id } = req.params;

  favoriteIds.push(id);

  res.json({ success: true });
});

app.delete("/api/favorites/remove/:id", (req, res) => {
  const { id } = req.params;

  favoriteIds = favoriteIds.filter((movieId) => movieId !== id);

  res.json({ success: true });
});

const findMovieById = (id) => {
  for (const type in movieData) {
    const movie = movieData[type].find((m) => m.id === id);
    if (movie) {
      return movie;
    }
  }
  return null;
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
