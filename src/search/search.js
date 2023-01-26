import React from 'react';

import Card from '../cards';
import './search.css';

export default class Search extends React.Component {
  state = {
    label: '',
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    e.currentTarget.value = '';
    this.props.checkLabel(this.state.label);
    this.setState({
      label: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="search"
          placeholder="Type to search"
          type="text"
          onChange={this.onLabelChange}
          value={this.state.label}
          autoFocus
        ></input>
      </form>
    );
  }
}
