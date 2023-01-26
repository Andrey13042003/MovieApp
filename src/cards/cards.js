import React, { Component } from 'react';
import { Image, Typography } from 'antd';

import Search from '../search';
import Service from '../service';

import './cards.css';
const { Title, Paragraph } = Typography;

export default class Card extends Component {
  service = new Service();
  search = new Search();
  state = {
    id: null,
    title: null,
    overview: null,
    release_date: null,
    poster_path: null,
  };

  constructor(props) {
    super(props);
    this.idx = this.props.idx;
    this.lbl = this.props.lbl;
    this.updateMovie();
  }

  updateMovie = () => {
    let number = Number(this.idx);
    this.service.getRequestFilms(this.lbl, '1').then((res) => {
      this.setState({
        id: res.results[number].id,
        title: res.results[number].original_title,
        overview: res.results[number].overview,
        release_date: res.results[number].release_date,
        poster_path: res.results[number].backdrop_path,
      });
    });
  };

  render() {
    const { id, title, overview, release_date, poster_path } = this.state;
    const photoURL = `https://image.tmdb.org/t/p/w500/${poster_path}`;

    return (
      <li key={id} className="card">
        {<Image className="card__photo" width={1000} height={280} src={photoURL} alt="movie-zphoto" />}
        <div className="card__info">
          <Typography className="card__description">
            <Title className="card__title" level={4}>
              {title}
            </Title>
            <span className="card__date">{release_date} </span>
            <Paragraph>{overview}</Paragraph>
          </Typography>
        </div>
      </li>
    );
  }
}
