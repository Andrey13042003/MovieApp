import React, { Component } from 'react';
import { Typography } from 'antd';

import Service from '../../service';
import Rate from '../rate';

import './movieItem.css';

const { Title, Paragraph } = Typography;

export default class MovieItem extends Component {
  service = new Service();

  state = { stars: 0 };

  shortText = (text) => text.replace(/^(.{193}[^\s]*).*/, '$1');

  defineColor = (vote_average) => {
    if (vote_average > 0 && vote_average < 3) {
      return '#E90000';
    } else if (vote_average >= 3 && vote_average < 5) {
      return '#E97E00';
    } else if (vote_average >= 5 && vote_average < 7) {
      return '#E9D100';
    } else {
      return '#66E900';
    }
  };

  changeStars = (e, rating) => {
    const { rated } = this.state;
    const { item } = this.props;
    if (e == 0 && (rated || (rating > 0 && !rated))) {
      this.service.deleteRateMovie(item.id, this.props.guest_session_id);
      this.props.deleteFilmRated(item.id);
    }
    this.setState(() => ({ stars: e }));
  };

  render() {
    const { stars } = this.state;
    const { rated, item, filmGenres, guest_session_id, postRequest } = this.props;
    const { poster_path, overview, vote_average, title, release_date } = item;

    let photoURL = poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : 'https://place-hold.it/183x281';
    let color = this.defineColor(vote_average);

    stars > 0 && postRequest(item.id, guest_session_id, stars);

    return (
      <li className="card">
        <img className="card__photo" src={photoURL} alt="movie-zphoto" />
        <Typography className="card__description">
          <Title className="card__title" level={4}>
            {title}
          </Title>
          <span className="card__date">{release_date} </span>
          <div className="genres">{filmGenres}</div>
          <Paragraph className="text">{this.shortText(overview)}</Paragraph>
          <Rate
            changeStars={(e, rating, item) => this.changeStars(e, rating, item)}
            rated={rated}
            movieItem={item}
            stars={stars}
          />
          <span style={{ borderColor: `${color}` }} className="card__mark">
            {vote_average}
          </span>
        </Typography>
      </li>
    );
  }
}
