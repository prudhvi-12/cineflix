import React, { Component } from 'react';
import { Link, Route, Redirect, BrowserRouter, Switch } from 'react-router-dom';
import axios from 'axios';
import queryString from 'querystring';
import Movie from './Movie';
import Page from './pagination';
import Genre from './genre';
import '../css/styling.css';

const api_key = 'api_key=f2f1f2dd6ced300c2e885d8b647c510b';
const base_url = 'https://api.themoviedb.org/3/movie';

class movies extends Component {
    state = {
        movies: [],
        pageno: 1,
        totalpages: 1,  //we can set this form the result object
        genres: [],
        count:1,
    };
    notfound=()=>{
         const {count}=this.state;
         count+=1;
         this.setState(count);
    }
    addGenre = async (id) => {
        const pre = [...this.state.genres];
        pre.push(id);
        const k=pre.toString();
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${k}&with_watch_monetization_types=flatrate`);
        const obj=[...data.results];
        this.setState({ genres: pre,movies:obj,pageno:1 });
    }
    deleteGenre = async (id) => {
        const pre = [...this.state.genres];
        const ind = pre.indexOf(id);
        pre.splice(ind, 1);
        const k=pre.toString();
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${k}&with_watch_monetization_types=flatrate`);
        const obj=[...data.results];
        this.setState({ genres: pre,movies:obj,pageno:1 });
    }
    click = (id, type) => {
        const forward = `/movie/${id}`;
        this.props.history.push(forward);
    }
    async componentDidMount() {
        const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${this.state.pageno}`);
        const obj = [...data.results];
        this.setState({ movies: obj, totalpages: data.total_pages });
    }

    changepage = async (id) => {
        if (this.state.genres.length === 0) {
            const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${id}`);
            const obj = [...data.results];
            this.setState({ movies: obj, pageno: id });
        }
        else{
            const { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${id}`);
            const obj = [...data.results];
            this.setState({ movies: obj, pageno: id });
        }
        window.scroll(0, 0);   //whenever there is a change in page number we should got to top
    }
    render = () => {
        const { movies } = this.state;
        return (
            <div style={{textAlign:'center'}}>
                <Genre type='movie' addGenre={this.addGenre} deleteGenre={this.deleteGenre} />
            <div className="row" style={{marginTop:'200px'}}>
                {movies.map(movie => <Movie id={movie.id} notfound={this.notfound} type='movie' date={movie.release_date || movie.first_air_date} name={movie.name || movie.title} click={this.click} title={movie.title} rate={movie.vote_average} path={movie.poster_path} />)}
            </div>
            {this.state.movies.length > 1 && <Page totalpages={this.state.totalpages} changepage={this.changepage} />}
            </div>
        );
    }
}

export default movies;