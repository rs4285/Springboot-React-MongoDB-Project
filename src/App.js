import './App.css';
import api from './api/axiosConfig';
import { useState, useEffect } from 'react';
import Layout from './Components/Layout';
import { Routes, Route } from 'react-router-dom';
import Home from './Components/home/Home';
import Header from './Components/header/Header';
import Trailer from './Components/trailer/Trailer';
import Reviews from './Components/reviews/Reviews';
import NotFound from './Components/notfound/NotFound';

function App() {
  const [movies, setMovies] = useState([]); // Initialize as empty array
  const [movie, setMovie] = useState(null); // Initialize as null
  const [reviews, setReviews] = useState([]); // Initialize as empty array

  const getMovies = async () => {
    try {
      const response = await api.get("/api/v1/movies");
      setMovies(response.data);
    } catch (err) {
      console.log(err);
      // Optional: Set an error state here
    }
  }

  const getMovieData = async (movieId) => {
    try {
      const response = await api.get(`/api/v1/movies/${movieId}`);
      const singleMovie = response.data;
      setMovie(singleMovie);
      setReviews(singleMovie.reviews);
    } catch (error) {
      console.error(error);
      // Optional: Set an error state here
    }
  }

  useEffect(() => {
    getMovies();
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home movies={movies} />} />
          <Route path="/Trailer/:ytTrailerId" element={<Trailer />} />
          <Route path="/Reviews/:movieId" element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews} />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
