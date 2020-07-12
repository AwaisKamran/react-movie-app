import React from 'react';
import {Link} from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import placeholder from '../images/placeholder.jpg';
import './movieCard.css';

function MovieCard({ id, title, release_date, genre_ids, poster_path, backdrop_path, first_air_date, name, type = 1, readonly = false }) {
    return (
        <Link to={ type === 1? `/movieDetail/${id}`: `tvDetail/${id}`}>
            <div className="mb-4 movie-card-container">
                <div className="movie-card-image" style={{ border: readonly ? '3px solid #ff0040' : null, backgroundImage: `url(${process.env.REACT_APP_TMDB_IMAGE_LINK}${poster_path}), url(${placeholder})` }}>
                    {
                        readonly ? null
                            : <div className="overlay lato lato-900">
                                <div class="text-highlight animate__animated animate__fadeInUp">
                                    <StarFilled className="display-inline" />
                                    <div className="rating-adjustment ml-1 display-inline">3.8</div>
                                </div>
                            </div>
                    }
                </div>
                {
                    readonly ? null
                        : <div>
                            <div className="movie-card-details lato lato-400 color-light-gray mt-1">{type === 1 ? new Date(release_date).getFullYear() : new Date(first_air_date).getFullYear()}, Action, 1h 30 min</div>
                            <div className="movie-card-name lato lato-400 color-white">{type === 1 ? title : name}</div>
                        </div>
                }
            </div>
        </Link>
    );
}

export default MovieCard;
