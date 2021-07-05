import React, { Component } from 'react';
import axios from 'axios';
import './styling.css';

const api_key = 'api_key=f2f1f2dd6ced300c2e885d8b647c510b';
const base_url = 'https://api.themoviedb.org/3/movie';
const img_base = 'https://image.tmdb.org/t/p/w500';

class seriesId extends Component {
  state = {
    data: {},
    yt_link: '',
    cast: [],
  }

  async componentDidMount() {
    const k = this.props.match.params.id;
    let yt_link='';
    const { data } = await axios.get(`https://api.themoviedb.org/3/tv/${k}?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US`);
    const obj = await axios.get(`https://api.themoviedb.org/3/tv/${k}/videos?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US`);
         if(obj.data.results.length>0){
           yt_link = (obj.data.results[0].key);
         }else{
              yt_link='https://www.youtube.com/';
         }
    const { data: obj2 } = await axios.get(`https://api.themoviedb.org/3/tv/${k}/credits?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US`);
    const cast = [...obj2.cast];
    this.setState({ data, yt_link, cast });
  }
  render() {
    const imgpath = img_base + this.state.data.poster_path;
    const trailerpath = 'https://youtu.be/' + this.state.yt_link;
    const { name, first_air_date: date, number_of_episodes, number_of_seasons, overview, vote_average, tagline, homepage } = this.state.data;
    return (
      <div className="container m-2">
        <div className="row">
          <div className="col-5">
            <img src={imgpath} alt='Image Not-Found' />
          </div>
          <div className="col">
            <p className="badge text-wrap bg-primary fw-bolder title" style={{ color: 'white' }}>{name}
              <sub className="tag">{tagline}</sub>
            </p>
            <h2 className="fw-bolder">Overview</h2>
            <p>{overview}</p>
            <div className="m-3">
              <span className="bold">Rating</span>
              <span className="badge text-wrap bg-success bold">{vote_average}</span>
            </div>
            <div className="m-3">
              <span className="bold">No.of Episodes</span>
              <span className="badge text-wrap bg-success bold">{number_of_episodes}</span>
            </div>
            <div className="m-3">
              <span className="bold">No.of Seasons</span>
              <span className="badge text-wrap bg-success bold">{number_of_seasons}</span>
            </div>
            <div className="m-3">
              <button type="button" className="btn bg-dark search-bar"><a className="link" href={homepage} target="_blank">Homepage</a></button>
              <button type="button" className="btn bg-dark search-bar"><a className="link" href={trailerpath} target="_blank">Watch Trailer</a></button>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginTop: '120px' }}>
          <h1 style={{ textAlign: 'center' , margin:'10px' }}>Cast</h1>
          {this.state.cast.map((cast) => {
            cast.profile_path = 'https://image.tmdb.org/t/p/w300' + cast.profile_path;
            return (<div className="card"  style={{width:'15%'}} >
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

export default seriesId;