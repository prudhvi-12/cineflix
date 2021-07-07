/*For making words bold use fw-bold fw-bolder */


import { findByTitle } from '@testing-library/react';
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import './styling.css';

class Movie extends Component {
    state={
           imgbase:'https://image.tmdb.org/t/p/w500',
           count:0,
    }
    rate(){
        if(this.props.rate>=1)
        return  <span className="card-text badge bg-primary text-wrap movie">{this.props.rate}</span>
        else
        return <span className="card-text badge bg-primary text-wrap movie">Not Rated</span>
    }

    render(){  
          var {title,path,id,name,date,rate,type}=this.props;
           const imgaddress=this.state.imgbase+path;
        return (
        <div className="column"  onClick={()=> this.props.click(id,type)}>
            <img src={imgaddress}  alt='Image Not-Found' className="movie-image"/>
            <div className="card-body">
              {{name} && <p className="card-text fw-bolder">{name}</p>}  
               {this.rate()}
              {{date} && <span className="card-text badge bg-primary text-wrap ml-1">{date}</span>}
            </div>
        </div>
        );
    }
}
 
export default Movie;