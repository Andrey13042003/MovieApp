import React from 'react';
import { debounce } from 'lodash';

import './search.css';

const Search = ({ checkLabel }) => {
  const onLabelChange = debounce((value) => {
    checkLabel(value);
  }, 500);

  return (
    <input
      className="search"
      placeholder="Type to search"
      type="text"
      onChange={(e) => onLabelChange(e.target.value)}
      autoFocus
    />
  );
};

export default Search;
