import React, { Component } from 'react';
import './styling.css';
import axios from 'axios';
import { BackgroundColor } from 'jest-matcher-utils/node_modules/chalk';

class Genre extends Component {
    state = {
        type: '',
        genres: [],
        sgenres: [],
    }
    async componentDidMount() {
        const fi = this.props.type;
        const { data } = await axios.get(`https://api.themoviedb.org/3/genre/${fi}/list?api_key=f2f1f2dd6ced300c2e885d8b647c510b&language=en-US`);
        const se = data.genres;
        this.setState({ type: fi, genres: se });
    }
    onClick = (id) => {
        const pre = [...this.state.sgenres];
        const ind = pre.indexOf(id);
        if (ind === -1) {
            pre.push(id);
            this.props.addGenre(id);
        }
        else {
                pre.splice(ind,1);
                this.props.deleteGenre(id);
        }
        this.setState({sgenres:pre});
    }
    genreClass(id) {
        const ind = this.state.sgenres.indexOf(id);
        if (ind === -1) {
            return "badge movie bg-primary text-wrap";
        }
        else{
            return "badge movie bg-danger text-wrap";
        }      
    }
    render() {
        return (
            <div className="genre">
                {this.state.genres.map(genre => <h2 className={this.genreClass(genre.id)} onClick={() => this.onClick(genre.id)}>{genre.name}</h2>)}
            </div>
        );
    }
}

export default Genre;