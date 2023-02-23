import React, { Component } from 'react';
import { Typography, Rate as Stars } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import ErrorIndicator from '../error-indicator';
import Service from '../../service';
import Rate from '../rate';

import './cards-search.css';
const { Title, Paragraph } = Typography;

export default class Card extends Component {
  service = new Service();
  newArr = [];
  ratedCards = null;

  constructor(props) {
    super(props);
    this.idx = this.props.idx;
    this.lbl = this.props.lbl;
  }

  componentDidCatch() {
    this.setState(() => ({ hasError: true }));
  }

  componentDidMount() {
    if (!this.props.rated) {
      this.updateMovie();
    }
  }

  state = {
    id: null,
    title: null,
    overview: null,
    release_date: null,
    poster_path: null,
    genre_ids: null,
    vote_average: null,
    hasError: false,
    stars: 0,
  };

  shortText = (text) => {
    return text.replace(/^(.{200}[^\s]*).*/, '$1');
  };

  updateMovie = () => {
    let res = this.props.item;
    this.setState(() => {
      return {
        id: res.id,
        title: res.original_title,
        overview: this.shortText(res.overview),
        release_date: res.release_date,
        poster_path: res.backdrop_path,
        genre_ids: res.genre_ids,
        vote_average: res.vote_average,
      };
    });
  };

  getGenre = () => {
    if (this.props.allGenres) {
      this.props.allGenres.map((item) => {
        this.state.genre_ids.forEach((id) => {
          if (item.id == id) {
            this.newArr.push(item.name);
          }
        });
      });
    }

    return this.newArr;
  };

  getRatedGenre = (genre_ids) => {
    this.props.allGenres.map((item) => {
      genre_ids.forEach((id) => {
        if (item.id == id) {
          this.newArr.push(item.name);
        }
      });
    });
    return this.newArr;
  };

  changeStars = (e) => {
    this.setState(() => ({ stars: e }));
  };

  changeRatedStars = (e) => {
    if (e == 0) {
      localStorage.removeItem(this.props.keyOfCard);
    } else {
      let data = JSON.parse(localStorage[this.props.keyOfCard]);
      data.stars = e;
      localStorage[this.props.keyOfCard] = JSON.stringify(data);
    }
  };

  render() {
    const { title, overview, release_date, poster_path, hasError, genre_ids, vote_average, id } = this.state;
    const { rated, localData, item } = this.props;
    let filmGenres;
    let photoURL = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    let color;

    if (hasError) {
      return <ErrorIndicator />;
    }

    if (poster_path == null) {
      photoURL = 'https://place-hold.it/183x281';
    }

    if (!rated && genre_ids) {
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

    if (rated && localData.genre_ids) {
      const genres = this.getRatedGenre(localData.genre_ids);
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

    if (vote_average > 0 && vote_average < 3) {
      color = '#E90000';
    } else if (vote_average >= 3 && vote_average < 5) {
      color = '#E97E00';
    } else if (vote_average >= 5 && vote_average < 7) {
      color = '#E9D100';
    } else {
      color = '#66E900';
    }
    let data = {
      stars: this.state.stars,
      genre_ids: this.state.genre_ids,
      photoURL: photoURL,
      title: title,
      release_date: release_date,
      overview: overview,
      vote_average: this.state.vote_average,
      color: color,
    };
    if (!rated) {
      for (let key in localStorage) {
        // eslint-disable-next-line no-prototype-builtins
        if (!localStorage.hasOwnProperty(key)) {
          continue;
        }
        if (key == item.id) {
          this.ratedCards = JSON.parse(localStorage.getItem(item.id)).stars;
        }
      }
    }

    return (
      <li className="card">
        <img className="card__photo" src={rated ? localData.photoURL : photoURL} alt="movie-zphoto" />
        <Typography className="card__description">
          <Title className="card__title" level={4}>
            {rated ? localData.title : title}
          </Title>
          <span className="card__date">{rated ? localData.release_date : release_date} </span>
          <div className="genres">{filmGenres}</div>
          <Paragraph className="text">{rated ? localData.overview : overview}</Paragraph>
          {rated ? (
            <Stars className="stars" defaultValue={localData.stars} count={10} onChange={this.changeRatedStars} />
          ) : (
            <Rate movieId={id} changeStars={this.changeStars} data={data} ratedCards={this.ratedCards} />
          )}
          <span style={{ borderColor: `${rated ? localData.color : color}` }} className="card__mark">
            {rated ? localData.vote_average : vote_average}
          </span>
        </Typography>
      </li>
    );
  }
}
