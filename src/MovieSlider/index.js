import React from 'react';
import Slider from "react-slick";
import axios from 'axios';
import './movieSlider.css';
import { Button } from 'antd';
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons';

class MovieSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moviesData: []
        };

        this.settings = {
            dots: true,
            infinite: true,
            speed: 400,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: false,
            autoplaySpeed: 4000,
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
                this.setState({ moviesData: res.results.slice(7, 18) });
            });
    }

    render() {
        return (
            <Slider {...this.settings}>
                {
                    this.state.moviesData.length > 0 ?
                        this.state.moviesData.map((movie) => {
                            return (
                                <div>
                                    <div className="movie-poster-slider" style={{ backgroundImage: `url(${process.env.REACT_APP_TMDB_POSTER_LINK}${movie.backdrop_path})` }}>
                                        <div class="row">
                                            <div class="animate__animated animate__fadeInLeft pl-5 movie-details-margin col-lg-6">
                                                <div class="movie-details-inner-container">
                                                    <div class="movie-title lato lato-900">{movie.title}</div>
                                                    <div class="movie-details lato lato-300">{new Date(movie.release_date).getFullYear()} | Action | 1h 30 min</div>

                                                    <Button
                                                        type="primary"
                                                        icon={<PlayCircleOutlined />}
                                                        loading={false}
                                                        onClick={f => f}
                                                        className="mr-2 mt-2"
                                                        danger
                                                    >
                                                        Watch Trailer
                                                    </Button>

                                                    <Button
                                                        type="primary"
                                                        icon={<PlusOutlined />}
                                                        loading={false}
                                                        onClick={f => f}
                                                        className="mr-2 mt-2"
                                                        danger
                                                    >
                                                        Add To Wishlist
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                        : null
                }
            </Slider>
        );
    }
}

export default MovieSlider;
