import React from 'react';

import Card from '../cards';
import './list-cards.css';

export default class ListCards extends React.Component {
  render() {
    const { lbl } = this.props;
    if (lbl.length > 0) {
      return (
        <ul className="movie-list">
          <Card idx="0" lbl={lbl} />
          <Card idx="1" lbl={lbl} />
          <Card idx="2" lbl={lbl} />
          <Card idx="3" lbl={lbl} />
          <Card idx="4" lbl={lbl} />
          <Card idx="5" lbl={lbl} />
          <Card idx="6" lbl={lbl} />
          <Card idx="7" lbl={lbl} />
          <Card idx="8" lbl={lbl} />
          <Card idx="9" lbl={lbl} />
          <Card idx="10" lbl={lbl} />
          <Card idx="11" lbl={lbl} />
          <Card idx="12" lbl={lbl} />
          <Card idx="13" lbl={lbl} />
          <Card idx="14" lbl={lbl} />
          <Card idx="15" lbl={lbl} />
          <Card idx="16" lbl={lbl} />
          <Card idx="17" lbl={lbl} />
          <Card idx="18" lbl={lbl} />
          <Card idx="19" lbl={lbl} />
        </ul>
      );
    } else {
      return <div></div>;
    }
  }
}
