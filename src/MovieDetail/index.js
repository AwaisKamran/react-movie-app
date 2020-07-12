import React from 'react';
import axios from 'axios';
import { notification, Avatar, Tooltip } from "antd";
import ReactPlayer from "react-player"
import MovieCard from "../MovieCard";
import Review from "../Review";
import placeholder from "../images/placeholder.jpg";
import './movieDetail.css';

class MovieDetail extends React.Component {
    constructor(props) {
        super(props);
        let { params } = this.props.match;

        this.state = {
            movie: {},
            cast: [],
            crew: [],
            director: {},
            type: params.type,
            movieTrailerKey: undefined
        };

        this.apiLink = process.env.REACT_APP_TMDB_API_LINK;
        this.apiKey = process.env.REACT_APP_TMDB_API_KEY;
        this.apiResponseLanguage = process.env.REACT_APP_TMDB_RESPONSE_LANGUAGE;

        this.fetchMovieCredits(params.id);
        this.fetchMovieDetail(params.id);
        this.fetchMovieTrailer(params.id);
    }

    fetchMovieTrailer(id) {
        axios.get(`${this.apiLink}/movie/${id}/videos?api_key=${this.apiKey}`)
            .then(res => res.data)
            .then(res => {
                this.setState({ movieTrailerKey: `https://www.youtube.com/watch?v=${res.results[0].key}` });
            });
    }

    fetchMovieDetail(id) {
        axios.get(`${this.apiLink}/movie/${id}?api_key=${this.apiKey}`)
            .then(res => res.data)
            .then(res => {
                this.setState({ movie: res });
            });
    }

    fetchMovieCredits(id) {
        axios.get(`${this.apiLink}/movie/${id}/credits?api_key=${this.apiKey}`)
            .then(res => res.data)
            .then(res => {
                this.setState({
                    cast: res.cast,
                    crew: res.crew,
                    director: res.crew.find((item) => {
                        return item.job === 'Director'
                    })
                });
            });
    }

    openNotification(message, description, type = 'error') {
        const color = type === 'success' ? '#b7eb8f' : '#ffccc7';
        notification.success({
            message,
            description,
            style: { backgroundColor: color }
        });
    }

    timeConvert(num) {
        var hours = Math.floor(num / 60);
        var minutes = num % 60;
        return `${hours} h ${minutes} min`;
    }

    render() {
        return (
            <div className="movie-detail-container container">
                <div class="movie-detail-cover" style={{ backgroundImage: `url(${process.env.REACT_APP_TMDB_POSTER_LINK}${this.state.movie.backdrop_path}), url(${placeholder})` }}>
                    <div class="movie-detail-cover-overlay"></div>
                </div>

                <div class="row">
                    <div className="col-lg-1"></div>
                    <div className="col-lg-3 movie-card-top-margin">
                        <MovieCard readonly={true} {...this.state.movie} />
                    </div>

                    <div className="col-lg-8 mb-4">
                        <br/>
                        <div class="movie-detail-title mt-4 title display-inline lato lato-700 color-white">{this.state.movie.title}</div>
                        <div class="movie-detail-subtitle ml-1 display-inline lato lato-300 color-light-gray"> {new Date(this.state.movie.release_date).getFullYear()} | {this.timeConvert(this.state.movie.runtime)}</div>
                        <div class="movie-detail-director mt-4">
                            <Tooltip className="avatar-margin" title={this.state.director.name}>
                                <Avatar shape="square" size="large" src={`${process.env.REACT_APP_TMDB_IMAGE_LINK}${this.state.director.profile_path}`} />
                            </Tooltip>
                            <span class="ml-2 movie-detail-director-title color-light-gray">Directed By {this.state.director.name}</span>
                        </div>
                        <div class="movie-detail-overview mt-4 lato lato-400 color-light-gray">{this.state.movie.overview}</div>
                        <div class="movie-detail-trailer mt-4">
                            {
                                this.state.movieTrailerKey ?
                                    <ReactPlayer width="100%" url={this.state.movieTrailerKey} />
                                    : null
                            }
                        </div>

                        <div class="cast-container">
                            <div class="title">Cast</div>
                            {
                                this.state.cast && this.state.cast.length > 0 ?
                                    this.state.cast.map((actor) => {
                                        return (
                                            actor.profile_path ?
                                                <Tooltip className="avatar-margin" title={actor.name}>
                                                    <Avatar shape="square" size="large" src={`${process.env.REACT_APP_TMDB_IMAGE_LINK}${actor.profile_path}`} />
                                                </Tooltip>
                                                : null
                                        );
                                    })
                                    : null
                            }
                        </div>
                    </div>
                    <br /><br />
                </div>

                <hr className="movie-line" />

                <div class="mt-4">
                    <div class="title mt-4">Movie Reviews</div>
                    <Review />
                </div>
            </div>
        );
    }
}

export default MovieDetail;
