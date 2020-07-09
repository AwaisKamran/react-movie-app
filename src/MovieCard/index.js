import React from 'react';
import './movieCard.css';
import cover from '../images/cover.jpg';
import { StarFilled } from "@ant-design/icons";

function MovieCard() {
    return (
        <div className="movie-card-container">
            <div className="movie-card-image" style={{ backgroundImage: `url(${cover})`}}>
                <div className="overlay lato lato-900">
                    <div class="text-highlight animate__animated animate__fadeInUp">
                        <StarFilled className="display-inline" /> 
                        <div className="rating-adjustment ml-1 display-inline">3.8</div>
                    </div>
                </div>
            </div>
            <div className="movie-card-details lato lato-400 color-light-gray mt-1">2017, Action, 1h 30 min</div>
            <div className="movie-card-name lato lato-400 color-white">Mission Impossible</div>
        </div>
    );
}

export default MovieCard;
