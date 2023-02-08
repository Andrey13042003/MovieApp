import React from 'react';

import Search from '../search';
import ListCards from '../list-cards';
import ErrorIndicator from '../error-indicator';

export default class App extends React.Component {
  state = {
    lbl: '',
    error: false,
  };

  checkLabel = (value) => {
    this.setState(() => {
      return {
        lbl: value,
      };
    });
  };

  onError = () => {
    this.setState(() => {
      return {
        error: true,
      };
    });
  };

  render() {
    if (this.state.error) {
      return <ErrorIndicator />;
    }

    return (
      <>
        <Search checkLabel={this.checkLabel} />
        {this.state.lbl != '' && <ListCards lbl={this.state.lbl} checkLabel={this.checkLabel} onError={this.onError} />}
      </>
    );
  }
}
