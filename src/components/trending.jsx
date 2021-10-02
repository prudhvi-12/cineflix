import React, { Component } from 'react';
import { Link, Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios';
import queryString from 'querystring';
import Movie from './Movie';
import Page from './pagination';
import '../css/styling.css';

const api_key = 'api_key=f2f1f2dd6ced300c2e885d8b647c510b';
const base_url = 'https://api.themoviedb.org/3/movie';

class trending extends Component {
       state = {
              movies: [],
              pageno: 1,
              totalpages: 1,
       };
       async componentDidMount() {
              const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=f2f1f2dd6ced300c2e885d8b647c510b&page=${this.state.pageno}`);
              const obj = [...data.results];
              this.setState({ totalpages: data.total_pages, movies: obj });
       }
       changepage = async (id) => {
              const { data } = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=f2f1f2dd6ced300c2e885d8b647c510b&page=${this.state.pageno}`);
              const obj = [...data.results];
              this.setState({ movies: obj, pageno: id });
              window.scroll(0, 0);
       }
       click = (id, type) => {
              const forward = `/${type}/${id}`;
              this.props.history.push(forward);
       }
       render = () => {
              const { movies } = this.state;
              return (
                     <div style={{textAlign:'center', marginTop:'100px'}}>
                            <div className="row">
                                   {movies.map(movie => <Movie id={movie.id} type={movie.media_type} date={movie.release_date || movie.first_air_date} name={movie.name || movie.title} click={this.click} rate={movie.vote_average} path={movie.poster_path} />)}
                            </div>
                            {this.state.movies.length > 0 && <div style={{display:'inline-block'}}><Page totalpages={this.state.totalpages} changepage={this.changepage} /></div>}
                     </div>
              );
       }
}

export default trending;