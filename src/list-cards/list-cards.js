import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import Card from '../cards';
import Service from '../service';
import Pagination from '../pagination';

import './list-cards.css';

export default class ListCards extends React.Component {
  service = new Service();
  state = {
    movieRes: [],
    loading: true,
    page: 1,
  };

  componentDidMount() {
    this.getRequestFilmFunc();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.lbl != this.props.lbl || prevState.page != this.state.page) {
      this.setState(() => ({ loading: true }));
      this.getRequestFilmFunc();
    }
  }

  getRequestFilmFunc = () => {
    this.service
      .getRequestFilms(this.props.lbl, this.state.page)
      .then((res) => {
        if (res.results.length == 0) {
          throw new Error();
        }
        this.setState(() => {
          return {
            movieRes: res.results,
            loading: false,
          };
        });
      })
      .catch(() => this.props.onError());
  };

  getPage = (page) => {
    this.setState(() => ({ page: page }));
  };

  render() {
    const { movieRes, loading } = this.state;
    const { lbl, onError } = this.props;

    let elements = movieRes.map((item, index) => {
      return <Card key={item.id} lbl={lbl} idx={index} onError={onError} page={this.state.page} />;
    });

    if (loading) {
      return <LoadingOutlined className="spiner" spin />;
    }
    return (
      <>
        <ul className="movie-list">{elements}</ul>
        <Pagination getPage={(page) => this.getPage(page)} currentPage={this.state.page} />
      </>
    );
  }
}