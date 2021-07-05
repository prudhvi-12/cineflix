import React, { Component } from 'react';
import axios from 'axios';
import './styling.css';

const api_key = 'api_key=f2f1f2dd6ced300c2e885d8b647c510b';
const base_url = 'https://api.themoviedb.org/3/movie';
const img_base = 'https://image.tmdb.org/t/p/w500';

class movieId extends Component {
  state = {
    data: {},
    cast: [],
    yt_link: '',
  }
  async componentDidMount() {
    const k = this.props.match.params.id;
    const type = this.props.match.params.type;
    const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${k}?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US`);
    const obj = await axios.get(`https://api.themoviedb.org/3/movie/${k}/videos?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US`);
    const { data: obj2 } = await axios.get(`https://api.themoviedb.org/3/movie/${k}/credits?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US`);
    const cast = [...obj2.cast];
    let yt_link = (obj.data.results[0].key);
    this.setState({ data, yt_link, cast });
  }
  render() {
    const imgpath = img_base + this.state.data.poster_path;
    const trailerpath = 'https://youtu.be/' + this.state.yt_link;
    const { title, release_date: date, overview, vote_average, tagline, runtime, budget, revenue, genres, homepage } = this.state.data;
    return (
      <div className="container m-2">
        <div className="row" >
          <div className="col-5">
            <img src={imgpath} alt='Image Not-Found'/>
          </div>
          <div className="col">
            <p className="badge text-wrap bg-primary fw-bolder title" style={{ color: 'white' }}>{title}
              <sub className="tag">{tagline}</sub>
            </p>
            <h2 className="fw-bolder">Overview</h2>
            <p>{overview}</p>
            <div className="m-3">
              <span className="bold">Rating</span>
              <span className="badge text-wrap bg-success bold">{vote_average}</span>
              <span className="bold">Runtime</span>
              <span className="badge text-wrap bg-success bold">{runtime} min</span>
            </div>
            <div className="m-3">
              <span className="bold">Budget</span>
              <span className="badge text-wrap bg-success bold">${budget}</span>
              <span className="bold">Revenue</span>
              <span className="badge text-wrap bg-success bold">${revenue}</span>
            </div>
            <div className="m-3">
              <button type="button" className="btn bg-dark search-bar"><a className="link" href={homepage} target="_blank">Homepage</a></button>
              <button type="button" className="btn bg-dark search-bar"><a className="link" href={trailerpath} target="_blank">Watch Trailer</a></button>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: '120px' }}>
          <h1 style={{ textAlign: 'center' }}>Cast</h1>
          {this.state.cast.map((cast) => {
            cast.profile_path = 'https://image.tmdb.org/t/p/w300' + cast.profile_path;
            return (<div className="card" style={{width:'190px' , margin: '10px' }} >
              <img src={cast.profile_path} className="card-img-top" alt="Not-Found" />
              <div className="card-body">
                <h5 className="card-title">{cast.name}</h5>
              </div>
            </div>);
          })}
        </div>

      </div>);
  }
};

export default movieId;