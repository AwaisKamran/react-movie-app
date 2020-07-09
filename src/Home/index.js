import React from 'react';
import './home.css';
import MovieSlider from "../MovieSlider";
import PopularMovies from "../PopularMovies";
import PopularReviews from '../PopularReviews';

function Home() {
      return (
        <div className="movie-slider">
            <MovieSlider></MovieSlider>
            <PopularMovies></PopularMovies><br/>
            <PopularReviews></PopularReviews><br/>
        </div>
    );
}

export default Home;
