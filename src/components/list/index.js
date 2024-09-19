import React from 'react';
import Item from '../item';
import './style.css';
import store from '../../store';
import { bem } from '../../utils';

function List() {
  const list = store.getState().list;

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

export default List;
