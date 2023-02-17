import React from 'react';
import { Rate as Stars } from 'antd';

import Service from '../service';

import './rate.css';

export default class Rate extends React.Component {
  service = new Service();

  state = {
    guest_session_id: null,
  };

  componentDidCatch(err, info) {
    console.log(info);
  }

  componentDidMount() {
    this.service.getGuestSessionId().then((res) => {
      this.setState(() => ({ guest_session_id: res.guest_session_id }));
    });
  }

  postRequest = () => {
    this.service.postFilmRate(this.props.movieId, this.state.guest_session_id, this.props.data.stars);
  };

  render() {
    if (this.state.guest_session_id && this.props.data.stars > 0) {
      localStorage.setItem(this.props.movieId, JSON.stringify(this.props.data));
      this.postRequest(); //пост запрос, меняем рейтинг
    }
    return <Stars className="stars" defaultValue={0} count={10} onChange={this.props.changeStars} />;
  }
}
