import React from 'react';
import { Rate as Stars } from 'antd';

import './rate.css';

export default class Rate extends React.Component {
  render() {
    const { changeStars, stars, movieItem, rated } = this.props;
    const rating = rated ? movieItem.rating : stars;

    return <Stars className="stars" defaultValue={rating} count={10} onChange={(e) => changeStars(e, rating)} />;
  }
}
