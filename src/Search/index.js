import React from 'react';
import axios from 'axios';
import MovieCard from '../MovieCard';
import { Input, Pagination, Spin } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import './search.css';
const antIcon = <LoadingOutlined style={{ fontSize: 26, color: '#FF0040' }} spin />;

const { Search } = Input;
class SearchMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            <Search 
                placeholder="Search For Movie Here" 
                onSearch={value => this.searchMovies(value, this.state.pageNumber) } 
                enterButton 
            /><br/>

            {
                this.state.loading? 
                <div className="center-block width-max-content mt-2"><Spin indicator={antIcon} /></div>
                : null
            }

            <div className="row mt-4 center-block">
                {
                    this.state.movieData.map((movie)=><div class="col-lg-3 col-md-4 col-sm-6 col-xs-6"><MovieCard {...movie}/></div>) 
                }
            </div>

            { 
                this.state.movieData.length > 0? 
                <Pagination className="center-block width-max-content" current={this.state.pageNumber} onChange={this.onChange} total={this.state.totalPages} />
                : null
            }
        </div>
    }

    searchMovies(value, page){
        this.setState({ loading: true });
        axios.get(`${this.apiLink}/search/movie?query=${value}&api_key=${this.apiKey}&language=${this.apiResponseLanguage}&page=${page}`)
            .then(res => res.data)
            .then(res => {
                this.setState({ value, loading: false, movieData: res.results, totalPages: res.total_pages, pageNumber: page });
            });
    }

    onChange = page => {
        this.setState({ pageNumber: page });
        this.searchMovies(this.state.value, page);
    };
};

export default SearchMovies;
