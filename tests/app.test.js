let request = require('supertest');
let http = require('http');
let { app } = require('../index');
let { getAllMovies, getMovieById } = require('../data');

jest.mock('../data', () => ({
  ...jest.requireActual('../data'),
  getAllMovies: jest.fn(),
  getMovieById: jest.fn()
}));

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(() => {
  server.close();
});

describe('API Testings', () => {

  it('should return all the movies with 200 status code', async () => {
    let movies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan'
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont'
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola'
      }
    ]
    getAllMovies.mockReturnValue(movies)
    let res = await request(server).get('/movies')
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(movies);
    expect(res.body.length).toBe(3);
  });

  it('should return movie by id with 200 status code', async () => {
    let movie =  {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan'
      }
    getMovieById.mockReturnValue(movie);
    let res = await request(server).get('/movies/details/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(movie);
  })
  
})

describe('Function Testing', () => {

  it('should return all movies', () => {
    let movies = [
      {
        movieId: 1,
        title: 'Inception',
        genre: 'Sci-Fi',
        director: 'Christopher Nolan'
      },
      {
        movieId: 2,
        title: 'The Shawshank Redemption',
        genre: 'Drama',
        director: 'Frank Darabont'
      },
      {
        movieId: 3,
        title: 'The Godfather',
        genre: 'Crime',
        director: 'Francis Ford Coppola'
      }
    ]
    getAllMovies.mockReturnValue(movies);
    expect(getAllMovies()).toEqual(movies);
  })
  
})