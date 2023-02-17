import React from 'react';

import Rate from '../rate';

import './tabs.css';

export default class TabGroup extends React.Component {
  rate = new Rate();

  handleRemove = () => {
    document.querySelector('.vid').classList.remove('search_button');
    document.querySelector('.rated').classList.add('search_button');
  };

  handleAdd = () => {
    document.querySelector('.rated').classList.remove('search_button');
    document.querySelector('.vid').classList.add('search_button');
  };

  render() {
    return (
      <>
        <div className="tabs">
          <button
            className="vid search_button"
            onClick={() => {
              this.props.search();
              this.handleAdd();
            }}
          >
            Search
          </button>
          <button
            className="rated"
            onClick={() => {
              this.props.rated();
              this.handleRemove();
            }}
          >
            Rated
          </button>
        </div>
      </>
    );
  }
}
