import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import MovieCard from '../MovieCard';
import { Input, Pagination, Spin, Result, Button } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import './search.css';
import { Radio } from 'antd';
const antIcon = <LoadingOutlined style={{ fontSize: 26, color: '#FF0040' }} spin />;

const { Search } = Input;
class SearchMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 1,
            value: undefined,
            movieData: [],
            totalPages: 50,
            pageNumber: 1,
            loading: false
        };

        this.apiLink = process.env.REACT_APP_TMDB_API_LINK;
        this.apiKey = process.env.REACT_APP_TMDB_API_KEY;
        this.apiResponseLanguage = process.env.REACT_APP_TMDB_RESPONSE_LANGUAGE;
    }

    render() {
        return <div className="container searchContainer">
            <Radio.Group className="mt-1" onChange={this.onRadioChange} value={this.state.type}>
                <Radio value={1}>Movies</Radio>
                <Radio value={2}>TV Show</Radio>
            </Radio.Group>

            <Search
                className="mt-2"
                placeholder="Search For Movie Here"
                onSearch={value => this.searchMovies(value, this.state.pageNumber)}
                enterButton
            /><br />

            {
                this.state.loading ?
                    <div className="center-block width-max-content mt-4"><Spin indicator={antIcon} /></div>
                    : null
            }

            <div className="row mt-4 center-block">
                {
                    this.state.movieData.map((movie) => <div class="col-lg-3 col-md-4 col-sm-6 col-xs-6"><MovieCard {...movie} type={this.state.type} /></div>)
                }
            </div>

            {
                this.state.movieData.length > 0 ?
                    <Pagination className="center-block width-max-content" current={this.state.pageNumber} onChange={this.onChange} total={this.state.totalPages} />
                    : <Result
                        status="404"
                        title="Search Movies/TV Shows"
                        subTitle="Looking for a movie? Search it by title in the above search bar"
                        extra={<Link to="/home"><Button type="primary">Back Home</Button></Link>}
                    />
            }
            <br /><br /><br />
        </div>
    }

    searchMovies(value, page) {
        let link = this.state.type === 1? `${this.apiLink}/search/movie?query=${value}&api_key=${this.apiKey}&language=${this.apiResponseLanguage}&page=${page}`
        : `${this.apiLink}/search/tv?query=${value}&api_key=${this.apiKey}&language=${this.apiResponseLanguage}&page=${page}`;

        if (value) {
            this.setState({ loading: true });
            axios.get(link)
                .then(res => res.data)
                .then(res => {
                    this.setState({ value, loading: false, movieData: res.results, totalPages: res.total_pages, pageNumber: page });
                });
        }
        else {
            this.setState({ loading: false, movieData: [] });
        }
    }

    onChange = page => {
        this.setState({ pageNumber: page });
        this.searchMovies(this.state.value, page);
    };

    onRadioChange = e => this.setState({ movieData: [], type: e.target.value });
};

export default SearchMovies;
