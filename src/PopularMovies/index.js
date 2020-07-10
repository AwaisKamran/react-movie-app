import React from 'react';
import Slider from "react-slick";
import axios from 'axios';
import MovieCard from '../MovieCard';
import './popularMovies.css';

class PopularMovies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moviesData: []
        };

        this.settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 1,
                      infinite: true,
                      dots: true
                    }
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                  }
                },
                {
                    breakpoint: 775,
                    settings: {
                      slidesToShow: 2,
                      slidesToScroll: 2,
                      infinite: true,
                      dots: true,
                      arrows: false,
                    }
                  },
            ]
        };

        this.apiLink = process.env.REACT_APP_TMDB_API_LINK;
        this.apiKey = process.env.REACT_APP_TMDB_API_KEY;
        this.apiResponseLanguage = process.env.REACT_APP_TMDB_RESPONSE_LANGUAGE;

        this.fetchPopularMovies();
    }

    fetchPopularMovies() {
        axios.get(`${this.apiLink}/movie/popular?api_key=${this.apiKey}&language=${this.apiResponseLanguage}&page=1`)
            .then(res => res.data)
            .then(res => {
                this.setState({ moviesData: res.results.slice(0,6) });
            });
    }

    render() {
        return <div className="container">
            <span className="title lato lato-300">
                <span>Popular Movies</span>
            </span>

            {       
                this.state.moviesData.length > 0 ? 
                <div>
                    <Slider {...this.settings}>
                    { 
                        this.state.moviesData.map((movie)=><div><MovieCard {...movie} /></div>)
                    }   
                    </Slider>
                </div>: null
            }
        </div>;
    }
}

export default PopularMovies;
