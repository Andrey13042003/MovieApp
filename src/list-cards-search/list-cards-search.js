import React from 'react';
import { Space, Spin, Pagination } from 'antd';

import Card from '../cards-search';
import Service from '../service';
import { Consumer } from '../service-context';
import ErrorIndicator from '../error-indicator';

import './list-cards-search.css';

export default class ListCardsSearch extends React.Component {
  service = new Service();
  state = {
    movieRes: [],
    total_pages: null,
    loading: true,
    searchPage: 1,
    ratedPage: 1,
    hasError: false,
  };

  componentDidCatch() {
    this.setState(() => ({ hasError: true }));
  }

  componentDidMount() {
    {
      !this.props.rated ? this.getRequestFilmFunc() : this.setState(() => ({ loading: true }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.rated && prevProps.lbl != this.props.lbl && prevState.searchPage == this.state.searchPage) {
      this.setState(() => ({ searchPage: 1 }));
    }
    if (!this.props.rated && (prevProps.lbl != this.props.lbl || prevState.searchPage != this.state.searchPage)) {
      this.setState(() => ({ loading: true }));
      this.getRequestFilmFunc();
    }
    if (this.state.loading && this.props.rated) {
      setTimeout(() => {
        Promise.resolve().then(this.setState(() => ({ loading: false })));
      });
    }
  }

  getRequestFilmFunc = () => {
    this.service
      .getRequestFilms(this.props.lbl, this.state.searchPage)
      .then((res) => {
        if (res.results.length == 0) {
          throw new Error();
        }
        this.setState(() => {
          return {
            movieRes: res.results,
            loading: false,
            total_pages: res.total_pages,
          };
        });
      })
      .catch(() => {
        this.setState(() => ({ hasError: true }));
      });
  };

  render() {
    const { movieRes, loading } = this.state;
    const { lbl, rated } = this.props;
    let elements = [];

    const onChangeSearch = (page) => {
      this.setState({ searchPage: page });
    };

    const onChangeRated = (page) => {
      this.setState({ ratedPage: page });
    };

    if (this.state.hasError) {
      return <ErrorIndicator />;
    }

    if (loading) {
      return (
        <Space size="large" className="spiner">
          <Spin size="large" className="spiner" />
        </Space>
      );
    }

    if (!rated) {
      elements = movieRes.map((item, index) => {
        return (
          <Consumer key={item.id}>
            {(allGenres) => {
              return (
                <Card
                  key={item.id}
                  lbl={lbl}
                  idx={index}
                  page={this.state.searchPage}
                  rated={this.props.rated}
                  allGenres={allGenres}
                />
              );
            }}
          </Consumer>
        );
      });
    }

    if (rated) {
      elements = [];
      for (let key in localStorage) {
        // eslint-disable-next-line no-prototype-builtins
        if (!localStorage.hasOwnProperty(key)) {
          continue;
        }

        let localData = JSON.parse(localStorage.getItem(key));
        let oneCard = (
          <Consumer key={key}>
            {(allGenres) => {
              return (
                <Card rated={this.props.rated} localData={localData} key={key} keyOfCard={key} allGenres={allGenres} />
              );
            }}
          </Consumer>
        );
        if (elements.length < 20) {
          elements.push(oneCard);
        }
      }
    }

    return (
      <>
        <ul className="movie-list">{elements}</ul>
        {elements.length > 0 && (
          <Pagination
            className="page"
            current={rated ? this.state.ratedPage : this.state.searchPage}
            onChange={rated ? onChangeRated : onChangeSearch}
            total={rated ? 10 : this.state.total_pages}
          />
        )}
      </>
    );
  }
}
