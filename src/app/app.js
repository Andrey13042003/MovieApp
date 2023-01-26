import React from 'react';

import Search from '../search';
import ListCards from '../list-cards';

export default class App extends React.Component {
  state = {
    lbl: '',
  };

  checkLabel = (value) => {
    this.setState({
      lbl: value,
    });
  };

  render() {
    return (
      <React.Fragment>
        <Search checkLabel={this.checkLabel} />
        <ListCards lbl={this.state.lbl} />
      </React.Fragment>
    );
  }
}
