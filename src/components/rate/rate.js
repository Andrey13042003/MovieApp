import React from 'react';
import { Rate as Stars } from 'antd';

import Service from '../../service';

import './rate.css';

export default class Rate extends React.Component {
  service = new Service();

  state = {
    guest_session_id: null,
  };

  componentDidMount() {
    this.service.getGuestSessionId().then((res) => {
      this.setState(() => ({ guest_session_id: res.guest_session_id }));
    });
  }

  postRequest = () => {
    this.service.postFilmRate(this.props.movieId, this.state.guest_session_id, this.props.data.stars);
  };

  render() {
    const { guest_session_id } = this.state;
    const { data, movieId, ratedCards, changeStars } = this.props;
    if (guest_session_id && data.stars > 0) {
      localStorage.setItem(movieId, JSON.stringify(data));
      this.postRequest();
    }
    return <Stars className="stars" defaultValue={ratedCards ? ratedCards : 0} count={10} onChange={changeStars} />;
  }
}
