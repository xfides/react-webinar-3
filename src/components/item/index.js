import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { ACTION } from '../../store';
import { bem } from '../../utils';

function Item({ item }) {
  const addGoodToCart = useCallback(() => {
    ACTION.addGoodToCart(item.code);
  }, []);

  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{item.price}</div>
      <div className={cn('actions')}>
        <button onClick={addGoodToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
};

export default React.memo(Item);
