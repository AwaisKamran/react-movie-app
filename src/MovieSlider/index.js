import React from 'react';
import './movieSlider.css';
import cover from '../images/cover.jpg';
import Slider from "react-slick";
import { Button, Avatar, Rate } from 'antd';
import { PlayCircleOutlined, PlusOutlined } from '@ant-design/icons';

function MovieSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
    };

    return (
        <Slider {...settings}>
            <div>
                <div className="row movie-poster-slider" style={{ backgroundImage: 'url(' + cover + ')' }}>
                    <div class="animate__animated animate__fadeInLeft pl-5 movie-details-margin col-lg-6">
                        <div class="movie-details-inner-container">
                            <div class="movie-title lato lato-900">Mission Impossible</div>
                            <div class="movie-details lato lato-300">2017 | Action | 1h 30 min</div>

                            <Button
                                type="primary"
                                icon={<PlayCircleOutlined />}
                                loading={false}
                                onClick={f => f}
                                className="mr-2 mt-2 bg-primary"
                            >
                                Watch Trailer
                            </Button>

                            <Button
                                type="primary"
                                icon={<PlusOutlined />}
                                loading={false}
                                onClick={f => f}
                                className="mr-2 mt-2 bg-primary"
                            >
                                Add To Wishlist
                            </Button>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="popular-reviews">
                            <div class="popular-reviews-title lato">Popular Reviews</div>
                            <div class="popular-reviews-section">
                                <Avatar className="display-inline" shape="square" size={65} src={cover} />
                                <div className="display-inline">
                                    <div className="movie-title lato">Mission Impossible</div>
                                    <div className="movie-details lato">2017 | Action | 1h 30 min</div>
                                    <div className="moview-review lato">
                                        <Rate allowHalf defaultValue={2.5} />
                                        This was a great movie, i wish i could watch it again so good lovely wao, best.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Slider>
    );
}

export default MovieSlider;
