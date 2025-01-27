import axios from 'axios';

const API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5OTZmZDhiNGNmYTQ1NjZhYjYwNDE3NThkNzE2ZGUyNiIsIm5iZiI6MTczNTQ4OTAzMS4yMTI5OTk4LCJzdWIiOiI2NzcxNzYwN2I3MDAxM2NjMGY2MTRjNzMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.7bmuIIO7f1539c88E4Q_8__R4K372k1m05wpkAgMTqw';

const BASE_URL = 'https://api.themoviedb.org/3';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const fetchTrendingMovies = async page => {
  const { data } = await instance.get('/trending/movie/day', {
    params: { page },
  });
  return { movies: data.results, totalPages: data.total_pages };
};

export const fetchSearchMovies = async (query, page) => {
  const { data } = await instance.get('/search/movie', {
    params: { query, page, language: 'en-US' },
  });
  return { movies: data.results, totalPages: data.total_pages };
};

export const fetchMovieDetails = async movieId => {
  const { data } = await instance.get(`/movie/${movieId}`);
  return data;
};

export const fetchMovieCast = async movieId => {
  const { data } = await instance.get(`/movie/${movieId}/credits`);
  return data.cast;
};

export const fetchMovieReviews = async movieId => {
  const { data } = await instance.get(`/movie/${movieId}/reviews`);
  return data.results;
};
