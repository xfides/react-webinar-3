import React from 'react';
import Item from '../item';
import './style.css';
import { bem } from '../../utils';
import PropTypes from 'prop-types';
import { PT_ONE_GOOD } from '../../propTypesShare';

function List({ list }) {
  const cn = bem('List');

  return (
    <div className={cn()}>
      {list.map(item => (
        <div key={item.code} className={cn('item')}>
          <Item item={item} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(PT_ONE_GOOD),
};

export default React.memo(List);
