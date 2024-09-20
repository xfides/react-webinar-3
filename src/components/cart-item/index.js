import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { bem } from '../../utils';
import { ACTION } from '../../store';

function CartItem({ cartItem }) {
  const { code, title, price, count } = cartItem;

  const removeGoodFromCart = useCallback(() => {
    ACTION.removeGoodFromCart(code);
  }, []);

  const cn = bem('CartItem');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{code}</div>
      <div className={cn('title')}>{title}</div>
      <div className={cn('price')}>{price}</div>
      <div className={cn('count')}>{count}</div>
      <div className={cn('actions')}>
        <button onClick={removeGoodFromCart}>Удалить</button>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }),
};

export default React.memo(CartItem);
