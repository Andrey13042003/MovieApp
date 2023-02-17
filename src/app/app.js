import React from 'react';

import Search from '../search';
import Service from '../service';
import ErrorIndicator from '../error-indicator';
import TabGroup from '../tabs';
import ListCardsSearch from '../list-cards-search';
import { Provider } from '../service-context';

export default class App extends React.Component {
  service = new Service();

  state = {
    lbl: '',
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
    if (this.state.error) {
      return <ErrorIndicator />;
    }

    return (
      <Provider value={this.state.allGenres}>
        <TabGroup rated={this.ratedIsTrue} search={this.ratedIsFalse} />
        {!this.state.rated && <Search checkLabel={this.checkLabel} />}
        {this.state.lbl != '' && !this.state.rated && (
          <ListCardsSearch lbl={this.state.lbl} checkLabel={this.checkLabel} rated={this.state.rated} />
        )}
        {this.state.rated && <ListCardsSearch rated={this.state.rated} />}
      </Provider>
    );
  }
}
