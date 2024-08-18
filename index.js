let express = require('express');
let app = express();

let { getAllMovies, getMovieById } = require('./data');

app.get('/movies', (req, res) => {
  let allMovies = getAllMovies();
  res.status(200).json(allMovies);
});

app.get('/movies/details/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let movie = getMovieById(id);
  res.status(200).json(movie);
})

module.exports = {
  app
}