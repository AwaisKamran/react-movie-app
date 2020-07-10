import React from 'react';
import Slider from "react-slick";
import axios from 'axios';
import './movieSlider.css';
import { Button, Modal } from 'antd';
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ReactPlayer from "react-player"

class MovieSlider extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moviesData: [],
            visible: false,
            movieTrailerKey: undefined
        };

        this.settings = {
            dots: true,
            infinite: true,
            speed: 600,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 4000,
        };

        this.apiLink = process.env.REACT_APP_TMDB_API_LINK;
        this.apiKey = process.env.REACT_APP_TMDB_API_KEY;
        this.apiResponseLanguage = process.env.REACT_APP_TMDB_RESPONSE_LANGUAGE;

        this.fetchUpcomingMovies();
    }

    fetchUpcomingMovies() {
        axios.get(`${this.apiLink}/movie/upcoming?api_key=${this.apiKey}&language=${this.apiResponseLanguage}&page=1`)
            .then(res => res.data)
            .then(res => {
                this.setState({ moviesData: res.results.slice(7, 18) });
            });
    }

    fetchMovieTrailer(id){
        axios.get(`${this.apiLink}/movie/${id}/videos?api_key=${this.apiKey}`)
            .then(res => res.data)
            .then(res => {
                this.setState({ movieTrailerKey: `https://www.youtube.com/watch?v=${res.results[0].key}`});
            });
    }

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Slider {...this.settings}>
                    {
                        this.state.moviesData.length > 0 ?
                            this.state.moviesData.map((movie) => {
                                return (
                                    <div class="placement-style">
                                        <div className="movie-poster-slider" style={{ backgroundImage: `url(${process.env.REACT_APP_TMDB_POSTER_LINK}${movie.backdrop_path})` }}>
                                            <div class="row">
                                                <div class="animate__animated animate__fadeInLeft pl-5 movie-details-margin col-lg-6">
                                                    <div class="movie-details-inner-container">
                                                        <div class="movie-title lato lato-700">{movie.title}</div>
                                                        <div class="movie-details lato lato-300">{new Date(movie.release_date).getFullYear()} | Action | 1h 30 min</div>

                                                        <Button
                                                            type="primary"
                                                            icon={<PlayCircleOutlined />}
                                                            loading={false}
                                                            onClick={() => {
                                                                this.setState({ visible: true });
                                                                this.fetchMovieTrailer(movie.id);
                                                            }}
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

                <Modal closable={true} destroyOnClose={true} onCancel={this.handleCancel} footer={null} visible={this.state.visible}>
                    <ReactPlayer className="mt-4" width="100%" url={this.state.movieTrailerKey} /> 
                </Modal>
            </div>
        );
    }
}

export default MovieSlider;
