import { Pagination as Page } from 'antd';
import { useState } from 'react';

import './pagination.css';

const Pagination = ({ getPage, currentPage }) => {
  const [current, setCurrent] = useState(currentPage);
  const onChange = (page) => {
    getPage(page);
    setCurrent(page);
  };
  return <Page className="page" current={current} onChange={onChange} total={50} />;
};

export default Pagination;
