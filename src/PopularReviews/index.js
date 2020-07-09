import React from 'react';
import './popularReviews.css';
import Review from '../Review';
import { ThunderboltFilled } from '@ant-design/icons';

function PopularReviews() {
    return (
        <div class="container">
            <span class="title lato lato-300">
                <span>Popular Reviews</span>
            </span>
            <Review />
        </div>
    );
}

export default PopularReviews;
