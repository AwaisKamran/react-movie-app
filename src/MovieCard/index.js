import React from 'react';
import './movieCard.css';
import { StarFilled } from "@ant-design/icons";
import placeholder from '../images/placeholder.jpg';

function MovieCard({ title, release_date, genre_ids, poster_path, backdrop_path, first_air_date, name, type=1 }) {
    return (
        <div className="mb-4 movie-card-container">
            <div className="movie-card-image" style={{ backgroundImage: `url(${process.env.REACT_APP_TMDB_IMAGE_LINK}${poster_path}), url(${placeholder})`}}>
                <div className="overlay lato lato-900">
                    <div class="text-highlight animate__animated animate__fadeInUp">
                        <StarFilled className="display-inline" /> 
                        <div className="rating-adjustment ml-1 display-inline">3.8</div>
                    </div>
                </div>
            </div>
            <div className="movie-card-details lato lato-400 color-light-gray mt-1">{ type === 1? new Date(release_date).getFullYear(): new Date(first_air_date).getFullYear() }, Action, 1h 30 min</div>
            <div className="movie-card-name lato lato-400 color-white">{ type === 1? title: name}</div>
        </div>
    );
}

export default MovieCard;
