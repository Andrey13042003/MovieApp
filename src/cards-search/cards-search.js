import React, { Component } from 'react';
import { Typography, Rate as Stars } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import ErrorIndicator from '../error-indicator';
import Service from '../service';
import Rate from '../rate';

import './cards-search.css';
const { Title, Paragraph } = Typography;

export default class Card extends Component {
  service = new Service();
  newArr = [];

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

  transformMovie = (res, number) => {
    this.setState(() => {
      return {
        id: res.results[number].id,
        title: res.results[number].original_title,
        overview: this.shortText(res.results[number].overview),
        release_date: res.results[number].release_date,
        poster_path: res.results[number].backdrop_path,
        genre_ids: res.results[number].genre_ids,
        vote_average: res.results[number].vote_average,
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
        this.setState(() => ({ hasError: true }));
      });
  };

  getGenre = () => {
    this.props.allGenres.map((item) => {
      this.state.genre_ids.forEach((id) => {
        if (item.id == id) {
          this.newArr.push(item.name);
        }
      });
    });
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
      //удаляем карточку 
      localStorage.removeItem(this.props.keyOfCard);
    } else {
      //меняем количество звезд у определенной карточки в localStorage
      let data = JSON.parse(localStorage[this.props.keyOfCard]);
      data.stars = e;
      localStorage[this.props.keyOfCard] = JSON.stringify(data);
    }
  };

  render() {
    const { title, overview, release_date, poster_path, hasError } = this.state;
    const { rated, localData } = this.props;
    let filmGenres;
    let photoURL = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    let color;

    if (hasError) {
      return <ErrorIndicator />;
    }

    if (poster_path == null) {
      photoURL = 'https://place-hold.it/183x281';
    }

    if (this.state.genre_ids && !rated) {
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

    let mark = this.state.vote_average;
    if (mark > 0 && mark < 3) {
      color = '#E90000';
    } else if (mark >= 3 && mark < 5) {
      color = '#E97E00';
    } else if (mark >= 5 && mark < 7) {
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
          {!rated ? (
            <Rate movieId={this.state.id} changeStars={this.changeStars} data={data} />
          ) : (
            <Stars className="stars" defaultValue={localData.stars} count={10} onChange={this.changeRatedStars} />
          )}
          <span style={{ borderColor: `${rated ? localData.color : color}` }} className="card__mark">
            {rated ? localData.vote_average : this.state.vote_average}
          </span>
        </Typography>
      </li>
    );
  }
}
