import React from 'react';
import './style.css';
import { ACTION } from '../../store';
import { bem, plural } from '../../utils';
import { PT_CART } from '../../propTypesShare';

function getCartTotalCost() {
  const cartInfo = ACTION.buildCartInfo();

  return cartInfo.reduce((totalCost, oneCartGoodInfo) => {
    return totalCost + oneCartGoodInfo.count * oneCartGoodInfo.price;
  }, 0);
}

function Controls({ cart }) {
  const countOfGoods = Object.values(cart).length;
  const totalCost = countOfGoods ? getCartTotalCost() : 0;
  const normalizeWord = plural(countOfGoods, { one: 'товар', few: 'товара', many: 'товаров' });

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('shortCartInfo')}>
        {`В корзине: `}
        <strong>
          {countOfGoods ? `${countOfGoods} ${normalizeWord} / ${totalCost} Р` : 'пусто'}
        </strong>
      </div>
      <div className={cn('actions')}>
        <button onClick={ACTION.toggleModal}>Перейти</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  cart: PT_CART,
};

export default React.memo(Controls);
