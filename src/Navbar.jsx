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
      <nav className="navbar navbar-expand-lg navbar-light bg-warning">
        <div className="container-fluid">
          <a className="navbar-brand">TMDB</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/trending" className="nav-link" aria-current="page">Trending</Link>
              </li>
              <li className="nav-item">
                <Link to='/movies' className="nav-link" aria-current="page">Movies</Link>
              </li>
              <li className="nav-item">
                <Link to='/series' className="nav-link" aria-current="page">Series</Link>
              </li>
              <li className="nav-item">
                <Link to='/search' className="nav-link" aria-current="page">Search</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>);
  }
};

export default withRouter(Navbar);

