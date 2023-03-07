import React from 'react';
import { Space, Spin, Pagination } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import Search from '../search';
import Service from '../../service';
import ErrorIndicator from '../error-indicator';
import TabGroup from '../tabs';
import MovieList from '../movieList';
import { Provider } from '../../context';
import MovieItem from '../movieItem';

export default class App extends React.Component {
  service = new Service();
  newArr = [];

  state = {
    lbl: '',
    rated: false,
    allGenres: null,
    hasError: false,
    popular: false,
    movie: [],
    movieRated: [],
    total_pages: null,
    loading: true,
    searchPage: 1,
    ratedPage: 1,
    guest_session_id: null,
  };

  componentDidCatch() {
    this.setState(() => ({ hasError: true }));
  }

  componentDidMount() {
    this.getAllGenres();
    this.getPopularFilmFunc();
    this.service.getGuestSessionId().then((res) => this.setState(() => ({ guest_session_id: res.guest_session_id })));
  }

  componentDidUpdate(prevProps, prevState) {
    const { lbl, searchPage, rated, guest_session_id, movieRated, popular } = this.state;

    !this.state.allGenres && this.getAllGenres();
    if (rated && prevState.movieRated == movieRated) {
      !this.state.loading && this.isLoadingTrue();
      this.getFilmRated(guest_session_id);
    }
    if (prevState.lbl != lbl && prevState.searchPage == searchPage) {
      this.onChangeSearch(1);
    }
    if (popular && prevState.searchPage != searchPage) {
      this.isLoadingTrue();
      this.getPopularFilmFunc();
    }
    if (prevState.lbl != lbl || (!popular && prevState.searchPage != searchPage)) {
      this.isLoadingTrue();
      this.getRequestFilmFunc();
    }
  }

  isLoadingFalse = () => this.setState(() => ({ loading: false }));

  isLoadingTrue = () => this.setState(() => ({ loading: true }));

  checkLabel = (value) => this.setState(() => ({ lbl: value }));

  ratedIsTrue = () => this.setState(() => ({ rated: true }));

  ratedIsFalse = () => this.setState(() => ({ rated: false }));

  onChangeSearch = (page) => this.setState({ searchPage: page });

  onChangeRated = (page) => this.setState({ ratedPage: page });

  getAllGenres = () => this.service.getFilmGenre().then((res) => this.setState(() => ({ allGenres: res })));

  postRequest = (movieId, guest_session_id, stars) => this.service.postFilmRate(movieId, guest_session_id, stars);

  getRequestFilmFunc = () => {
    this.service
      .getRequestFilms(this.state.lbl, this.state.searchPage)
      .then((res) => {
        if (res.results.length == 0) {
          throw new Error();
        }
        this.setState(() => {
          return {
            movie: res.results,
            loading: false,
            hasError: false,
            popular: false,
            total_pages: res.total_pages,
          };
        });
      })
      .catch(() => {
        this.setState(() => ({ hasError: true }));
      });
  };

  getPopularFilmFunc = () => {
    this.service.getPopularFilms(this.state.searchPage).then((res) => {
      this.setState(() => {
        return {
          movie: res.results,
          popular: true,
          hasError: false,
          loading: false,
          total_pages: 5000,
        };
      });
    });
  };

  getFilmRated = (guest_session_id) => {
    this.service.getFilmRate(guest_session_id).then((res) => {
      this.setState(() => ({ movieRated: res.results, loading: false }));
    });
  };

  deleteFilmRated = (id) => {
    const { movieRated } = this.state;
    const idx = movieRated.findIndex((el) => el.id === id);
    const newArray = [...movieRated.slice(0, idx), ...movieRated.slice(idx + 1)];
    this.setState(() => ({ movieRated: newArray }));
  };

  getGenre = (item) => {
    const { allGenres } = this.state;
    if (allGenres) {
      allGenres.map((el) => {
        item.genre_ids.forEach((id) => {
          if (el.id == id) {
            this.newArr.push(el.name);
          }
        });
      });
    }

    return this.newArr;
  };

  getFilmGenres = (item) => {
    let filmGenres;
    if (item.genre_ids) {
      const genres = this.getGenre(item);
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
    return filmGenres;
  };

  getElements = (movie) => {
    const { rated, guest_session_id } = this.state;
    return movie.map((item) => {
      let filmGenres;
      if (typeof item != 'undefined') {
        filmGenres = this.getFilmGenres(item);
        return (
          <MovieItem
            key={item.id}
            rated={rated}
            item={item}
            filmGenres={filmGenres}
            guest_session_id={guest_session_id}
            postRequest={(movieId, sessionId, stars) => this.postRequest(movieId, sessionId, stars)}
            deleteFilmRated={(id) => this.deleteFilmRated(id)}
          />
        );
      }
    });
  };

  render() {
    const { allGenres, rated, lbl, hasError, loading, movie, searchPage, ratedPage, total_pages, popular, movieRated } =
      this.state;

    const isError = hasError ? <ErrorIndicator /> : null;

    const isLoading = loading ? (
      <Space size="large" className="spiner">
        <Spin size="large" className="spiner" />
      </Space>
    ) : null;

    let elements = rated ? this.getElements(movieRated) : this.getElements(movie);

    const showPagination =
      elements.length > 0 ? (
        <Pagination
          className="page"
          current={rated ? ratedPage : searchPage}
          onChange={rated ? this.onChangeRated : this.onChangeSearch}
          total={rated ? 10 : total_pages}
        />
      ) : null;

    return (
      <Provider value={allGenres}>
        <TabGroup rated={this.ratedIsTrue} search={this.ratedIsFalse} />
        <Search checkLabel={this.checkLabel} rated={rated} />
        {(lbl || popular) && (
          <MovieList isLoading={isLoading} elements={elements} isError={isError} showPagination={showPagination} />
        )}
      </Provider>
    );
  }
}
