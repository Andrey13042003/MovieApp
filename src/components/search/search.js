import React from 'react';
import { debounce } from 'lodash';

import './search.css';

export default class Search extends React.Component {
  state = {
    lbl: '',
  };

  onLabelChange = debounce((value) => {
    this.props.checkLabel(value);
  }, 500);

  changeValue = (value) => this.setState({ lbl: value });

  render() {
    if (!this.props.rated) {
      return (
        <input
          className="search"
          placeholder="Type to search..."
          type="text"
          value={this.state.lbl}
          onChange={(e) => {
            this.changeValue(e.target.value);
            this.onLabelChange(e.target.value);
          }}
        />
      );
    }
  }
}
