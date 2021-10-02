import React, { Component } from 'react';
import { Link, Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios';
import queryString from 'querystring';
import Movie from './Movie';
import Page from './pagination';
import '../css/styling.css';

class search extends Component {
    state = {
        movies: [],
        value: '',
        type: 'movie',
        page: 1,
        total_pages: 0,
    }
    onChange = (e) => {
        let pre = e.target.value;
        this.setState({ value: pre });
    }
    onSubmit = async (e) => {
        e.preventDefault();
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${this.state.type}?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US&query=${this.state.value}&page=${this.state.page}&include_adult=false`);
        let pre = data.results;
        this.setState({ movies: pre, total_pages: data.total_pages });
    }
    setType = async (e) => {
        let type = e.target.value;
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${type}?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US&query=${this.state.value}&page=${this.state.page}&include_adult=false`);
        let pre = data.results;
        this.setState({ movies: pre, type });
    }
    buttoncolor(type) {
        if (type === this.state.type && this.state.movies.length > 0) {
            return "btn btn-sm bg-danger m-4";
        }
        else {
            return "btn btn-sm bg-grey m-4";
        }
    }
    changepage = async (id) => {
        const { data } = await axios.get(`https://api.themoviedb.org/3/search/${this.state.type}?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US&query=${this.state.value}&page=${this.state.page}&include_adult=false`);
        const obj = [...data.results];
        this.setState({ movies: obj, pageno: id });
        window.scroll(0, 0);
    }
    click = (id, type) => {
        const forward = `/${type}/${id}`;
        this.props.history.push(forward);
    }
    render() {
        return (
            <React.Fragment style={{textAlign:'center'}}>
                <div className="search" style={{marginTop:'100px'}}>
                    <input style={{marginLeft:'10px' , border: '1px solid black' ,borderRadius:'3px'}} type="text" value={this.state.value} onChange={this.onChange} />
                    <button className="search-bar" onClick={this.onSubmit}>Search</button>
                    <br />
                    <button className={this.buttoncolor('movie')} value="movie" onClick={this.setType} disabled={this.state.movies.length === 0}>Movies</button>
                    <button className={this.buttoncolor('tv')} value="tv" onClick={this.setType} disabled={this.state.movies.length === 0}>Tv Series</button>
                </div>
                <div className="row"  style={{textAlign:'center'}}>
                    {this.state.movies.map(movie => <Movie id={movie.id} type={this.state.type} date={movie.release_date || movie.first_air_date} name={movie.name || movie.title} click={this.click} rate={movie.vote_average} path={movie.poster_path} />)}
                    {this.state.movies.length > 1 && <div className="m-3"><Page totalpages={this.state.total_pages} changepage={this.changepage} /></div>}
                </div>
            </React.Fragment>
        );
    }
}

export default search;