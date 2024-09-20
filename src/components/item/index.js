import React, { useCallback } from 'react';
import './style.css';
import { ACTION } from '../../store';
import { bem, numberToCurrency } from '../../utils';
import { PT_ONE_GOOD } from '../../propTypesShare';

function Item({ item }) {
  const { code, title, price } = item;
  const addGoodToCart = useCallback(() => {
    ACTION.addGoodToCart(code);
  }, []);

  const cn = bem('Item');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{code}</div>
      <div className={cn('title')}>{title}</div>
      <div className={cn('price')}>{numberToCurrency(price)}</div>
      <div className={cn('actions')}>
        <button onClick={addGoodToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PT_ONE_GOOD,
};

export default React.memo(Item);
