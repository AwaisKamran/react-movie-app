import React from 'react';
import axios from 'axios';
import { notification, Avatar, Tooltip, Spin } from "antd";
import ReactPlayer from "react-player"
import MovieCard from "../MovieCard";
import Review from "../Review";
import { LoadingOutlined } from '@ant-design/icons';
import placeholder from "../images/placeholder.jpg";
import './tvDetail.css';
const antIcon = <LoadingOutlined style={{ fontSize: 26, color: '#FF0040' }} spin />;

class TvDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            movie: {},
            cast: [],
            crew: [],
            director: {},
            movieTrailerKey: undefined
        };

        this.apiLink = process.env.REACT_APP_TMDB_API_LINK;
        this.apiKey = process.env.REACT_APP_TMDB_API_KEY;
        this.apiResponseLanguage = process.env.REACT_APP_TMDB_RESPONSE_LANGUAGE;
    }

    componentDidMount() {
        let { params } = this.props.match;

        //this.fetchMovieCredits(params.id);
        this.fetchMovieDetail(params.id);
        //this.fetchMovieTrailer(params.id);
    }

    fetchMovieTrailer(id) {
        axios.get(`${this.apiLink}/tv/${id}/videos?api_key=${this.apiKey}`)
            .then(res => res.data)
            .then(res => {
                this.setState({ movieTrailerKey: `https://www.youtube.com/watch?v=${res.results[0].key}` });
            });
    }

    fetchMovieDetail(id) {
        axios.get(`${this.apiLink}/tv/${id}?api_key=${this.apiKey}`)
            .then(res => res.data)
            .then(res => {
                this.setState({ movie: res });
            });
    }

    fetchMovieCredits(id) {
        axios.get(`${this.apiLink}/tv/${id}/credits?api_key=${this.apiKey}`)
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

    render() {
        return (
            this.state.movie && this.state.movie.id ?
                <div className="movie-detail-container container">
                    <div class="movie-detail-cover" style={{ backgroundImage: `url(${process.env.REACT_APP_TMDB_POSTER_LINK}${this.state.movie.backdrop_path}), url(${placeholder})` }}>
                        <div class="movie-detail-cover-overlay"></div>
                    </div>

                    <div class="row">
                        <div className="col-lg-1"></div>
                        <div className="col-lg-3 movie-card-top-margin">
                            <MovieCard readonly={true} {...this.state.movie} type="2" />
                        </div>

                        <div className="col-lg-8 mb-4">
                            <br />
                            <div class="movie-detail-title mt-4 title display-inline lato lato-700 color-white">{this.state.movie.original_name}</div>
                            <div class="movie-detail-subtitle ml-1 display-inline lato lato-300 color-light-gray"> {new Date(this.state.movie.first_air_date).getFullYear()} | {this.state.movie.episode_run_time[0]} min</div>
                            {/* <div class="movie-detail-director mt-4">
                                <Tooltip className="avatar-margin" title={this.state.movie.created_by[0]}>
                                    <Avatar shape="square" size="large" src={`${process.env.REACT_APP_TMDB_IMAGE_LINK}${this.state.movie.created_by[0].profile_path}`} />
                                </Tooltip>
                                <span class="ml-2 movie-detail-director-title color-light-gray">Directed By { this.state.movie.created_by[0]}</span>
                            </div>
                            <div class="movie-detail-overview mt-4 lato lato-400 color-light-gray">{this.state.movie.overview}</div>
                            <div class="movie-detail-trailer mt-4">
                                {
                                    this.state.movieTrailerKey ?
                                        <ReactPlayer width="100%" url={this.state.movieTrailerKey} />
                                        : null
                                }
                            </div> */}

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
                        <div class="title mt-4">TV Show Reviews</div>
                        <Review />
                    </div>
                </div>
                : <div className="center-block width-max-content mt-4"><Spin indicator={antIcon} /></div>
        );
    }
}

export default TvDetail;
