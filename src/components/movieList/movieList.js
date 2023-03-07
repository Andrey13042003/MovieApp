import React from 'react';

import './movieList.css';

export default class MovieList extends React.Component {
  render() {
    const { isLoading, isError, elements, showPagination } = this.props;

    if (isLoading) {
      return isLoading;
    }

    if (isError) {
      return isError;
    }

    return (
      <>
        <ul className="movie-list">{elements}</ul>
        {showPagination}
      </>
    );
  }
}
