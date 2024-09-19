import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { bem } from '../../utils';

function Head({ title }) {
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1>{title}</h1>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default React.memo(Head);
