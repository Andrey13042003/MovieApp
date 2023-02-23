import React from 'react';

import Rate from '../rate';

import './tabs.css';

export default class TabGroup extends React.Component {
  rate = new Rate();

  render() {
    return (
      <>
        <div className="tabs">
          <button
            className="btn"
            onClick={() => {
              this.props.search();
            }}
            autoFocus
          >
            Search
          </button>
          <button
            className="btn"
            onClick={() => {
              this.props.rated();
            }}
          >
            Rated
          </button>
        </div>
      </>
    );
  }
}
