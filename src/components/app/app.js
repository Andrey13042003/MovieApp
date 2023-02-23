import React from 'react';

import Search from '../search';
import Service from '../../service';
import ErrorIndicator from '../error-indicator';
import TabGroup from '../tabs';
import ListCardsSearch from '../list-cards-search';
import { Provider } from '../../context';

export default class App extends React.Component {
  service = new Service();

  state = {
    lbl: 'popular films',
    rated: false,
    allGenres: null,
  };

  componentDidMount() {
    this.getAllGenres();
  }

  componentDidUpdate() {
    if (!this.state.allGenres) {
      this.getAllGenres();
    }
  }

  checkLabel = (value) => {
    this.setState(() => {
      return {
        lbl: value,
      };
    });
  };

  ratedIsTrue = () => {
    this.setState(() => ({ rated: true }));
  };

  ratedIsFalse = () => {
    this.setState(() => ({ rated: false }));
  };

  getAllGenres = () => {
    this.service.getFilmGenre().then((res) => {
      this.setState(() => {
        return {
          allGenres: res,
        };
      });
    });
  };

  render() {
    const { allGenres, rated, lbl } = this.state;
    if (this.state.error) {
      return <ErrorIndicator />;
    }

    return (
      <Provider value={allGenres}>
        <TabGroup rated={this.ratedIsTrue} search={this.ratedIsFalse} />
        <Search checkLabel={this.checkLabel} rated={rated} />
        {lbl && <ListCardsSearch lbl={lbl} checkLabel={this.checkLabel} rated={rated} />}
      </Provider>
    );
  }
}
