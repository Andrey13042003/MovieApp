import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import Card from '../cards';
import Service from '../service';

import './list-cards.css';

export default class ListCards extends React.Component {
  service = new Service();

  state = {
    movieRes: [],
    loading: true,
  };

  componentDidUpdate() {
    if (this.state.loading && this.props.lbl != '') {
      this.setState(() => {
        return {
          loading: false,
        };
      });
    }
  }

  render() {
    const { lbl, onError } = this.props;
    const { loading, movieRes } = this.state;
    this.service
      .getRequestFilms(lbl, '1')
      .then((res) => {
        //res.json()
        if (res.ok) {
          this.setState(() => {
            return {
              movieRes: res.results,
            };
          });
        } else if (typeof res.ok == 'undefined') {
          throw new Error();
        }
      })
      .catch(() => {
        this.props.onError();
      });

    const elements = movieRes.map((item, index) => {
      return <Card key={item.id} lbl={lbl} idx={index} onError={onError} />;
    });

    if (loading) {
      return <LoadingOutlined className="spiner" spin />;
    }

    return <ul className="movie-list">{elements}</ul>;
  }
}
