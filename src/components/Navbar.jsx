import React, { Component } from 'react';
import { Link, Redirect, withRouter } from "react-router-dom";


{/*     We use link instead of anchor because 
        if we use anchor every time we navigate between links all of our js code is rerendered
        using link it is loaded only once at start and content is updated */}


class Navbar extends Component {
  state = {

  }

  render = () => {
    return (
      <div className="navbar">
         <h1 style={{fontFamily:'moz-initial'}}>CINE BUX</h1>
        <Link to="/trending" className="navbar-column link">Trending</Link>
        <Link to='/movies' className="navbar-column link">Movies</Link>
        <Link to='/series' className="navbar-column link">Series</Link>
        <Link to='/search' className="navbar-column link">Search</Link>
      </div>);
  }
};

export default withRouter(Navbar);

