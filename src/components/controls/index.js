import React from 'react';
import './style.css';
import { ACTION } from '../../store';
import { bem, plural } from '../../utils';

function Controls() {
  const cartInfo = ACTION.buildCartInfo();
  const countOfGoods = cartInfo.length;
  const totalCost = cartInfo.reduce((totalCost, oneCartGoodInfo) => {
    return totalCost + oneCartGoodInfo.count * oneCartGoodInfo.price;
  }, 0);

  const normalizeWord = plural(countOfGoods, {
    one: 'товар',
    few: 'товара',
    many: 'товаров',
  });

  let shortCartInfoStr = countOfGoods
    ? `${countOfGoods} ${normalizeWord} / ${totalCost} Р`
    : 'пусто';

  const cn = bem('Controls');

  return (
    <div className={cn()}>
      <div className={cn('shortCartInfo')}>
        {`В корзине: `} <strong>{shortCartInfoStr}</strong>
      </div>
      <div className={cn('actions')}>
        <button onClick={ACTION.toggleModal}>Перейти</button>
      </div>
    </div>
  );
}

export default Controls;
