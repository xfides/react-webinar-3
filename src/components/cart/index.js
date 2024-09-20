import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { bem, getTotalCost } from '../../utils';
import { ACTION } from '../../store';
import CartItem from '../cart-item';
import { PT_CART } from '../../propTypesShare';

function Cart({ cart }) {
  if (Object.values(cart).length === 0) return 'Нет выбранных товаров';

  const cartInfo = ACTION.buildCartInfo();
  const totalCost = getTotalCost(cartInfo);

  const cn = bem('Cart');

  return (
    <div className={cn()}>
      {cartInfo.map(cartItem => (
        <div key={cartItem.code} className={cn('item')}>
          <CartItem cartItem={cartItem} />
        </div>
      ))}
      <div>
        <strong>Итого</strong>
        <strong>{totalCost}</strong>
      </div>
    </div>
  );
}

Cart.propTypes = {
  cart: PT_CART,
};

export default React.memo(Cart);
