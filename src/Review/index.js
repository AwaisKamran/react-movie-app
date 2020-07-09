import React from 'react';
import './review.css';
import { Avatar, Rate } from 'antd';
import cover from '../images/cover.jpg';
import { HeartFilled, MessageFilled } from '@ant-design/icons';

function Review() {
    return (
        <div class="row review-container">
            <div class="col-lg-2 no-padding">
                <div class="review-movie-image mt-2" style={{ backgroundImage: `url(${cover})`}}></div>
            </div>

            <div class="col-lg-10">
                <div class="review-details-container lato lato-300 display-inline">
                    <div class="review-details-movie-name mb-1 lato lato-700 color-white">
                        Mission Impossible 
                        <span class="review-details-movie-year ml-1 color-light-gray lato lato-400">2020</span>
                    </div>

                    <div class="mb-2 review-details-user">
                        <div class="review-user-avatar display-inline">
                            <Avatar src={cover} />
                        </div>
                        <div class="review-user-name ml-2 display-inline lato lato-400 color-gray">
                            <span>Awais Kamran</span>
                            <span className="ml-2">
                                <Rate style={{ color: '#00DB54' }} disabled allowHalf defaultValue={2.5} />         
                                <span class="ml-2">
                                    <MessageFilled /> 
                                    <span class="ml-1">45</span>
                                </span>
                            </span>
                        </div>
                    </div>

                    <div class="mb-2 review-details-text lato lato-400 color-light-gray">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                    </div>

                    <div class="review-details-likes lato lato-400 color-light-gray">
                        100 <span class="color-primary"><HeartFilled /></span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Review;
