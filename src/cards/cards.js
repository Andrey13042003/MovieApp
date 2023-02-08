import React, { Component } from 'react';
import { Typography } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import Service from '../service';

import './cards.css';
const { Title, Paragraph } = Typography;

export default class Card extends Component {
  service = new Service();
  newArr = [];

  constructor(props) {
    super(props);
    this.idx = this.props.idx;
    this.lbl = this.props.lbl;
  }

  componentDidMount() {
    this.updateMovie();
    this.getAllGenres();
  }

  state = {
    id: null,
    title: null,
    overview: null,
    release_date: null,
    poster_path: null,
    genre_ids: null,
    allGenres: null,
  };

  shortText = (text) => {
    return text.replace(/^(.{200}[^\s]*).*/, '$1');
  };

  transformMovie = (res, number) => {
    this.setState(() => {
      return {
        id: res.results[number].id,
        title: res.results[number].original_title,
        overview: this.shortText(res.results[number].overview),
        release_date: res.results[number].release_date,
        poster_path: res.results[number].backdrop_path,
        genre_ids: res.results[number].genre_ids, //хранится массив из id
      };
    });
  };

  updateMovie = () => {
    this.service
      .getRequestFilms(this.lbl, this.props.page)
      .then((response) => {
        return this.transformMovie(response, this.idx);
      })
      .catch((err) => {
        console.log(err, 'err at cards');
        this.props.onError();
      });
  };

  getGenre = () => {
    this.state.allGenres.map((item) => {
      this.state.genre_ids.forEach((id) => {
        if (item.id == id) {
          this.newArr.push(item.name);
        }
      });
    });
    return this.newArr;
  };

  getAllGenres = () => {
    this.service.getFilmGenre().then((res) => {
      this.setState(() => {
        return {
          allGenres: res,
        };
      });
    });
  };

  render() {
    const { title, overview, release_date, poster_path } = this.state;
    let filmGenres;
    let photoURL = `https://image.tmdb.org/t/p/w500/${poster_path}`;

    if (poster_path == null) {
      photoURL = 'https://place-hold.it/183x281';
    }
    if (this.state.allGenres != null && this.state.genre_ids != null) {
      const genres = this.getGenre();
      this.newArr = [];
      filmGenres = (
        <>
          {genres.map((genre) => {
            return (
              <button className="astext" key={uuidv4()}>
                {genre}
              </button>
            );
          })}
        </>
      );
    }

    return (
      <li className="card">
        <img className="card__photo" src={photoURL} alt="movie-zphoto" />
        <Typography className="card__description">
          <Title className="card__title" level={4}>
            {title}
          </Title>
          <span className="card__date">{release_date} </span>
          <div className="genres">{filmGenres}</div>
          <Paragraph className="text">{overview}</Paragraph>
        </Typography>
      </li>
    );
  }
}
