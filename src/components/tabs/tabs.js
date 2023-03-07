import React from 'react';

import './tabs.css';

export default class TabGroup extends React.Component {
  activeSearch = true;
  activeRated = false;

  changeData = (searchValue, ratedValue, func) => {
    this.activeSearch = searchValue;
    this.activeRated = ratedValue;
    func();
  };

  render() {
    return (
      <>
        <div className="tabs">
          <button
            className={this.activeSearch ? 'activeBtn' : 'btn'}
            onClick={() => this.changeData(true, false, this.props.search)}
          >
            Search
          </button>
          <button
            className={this.activeRated ? 'activeBtn' : 'btn'}
            onClick={() => this.changeData(false, true, this.props.rated)}
          >
            Rated
          </button>
        </div>
      </>
    );
  }
}
