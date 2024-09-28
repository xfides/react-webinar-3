import { memo, useCallback } from 'react';
import propTypes from 'prop-types';
import { numberFormat } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import PropTypes from 'prop-types';
import './style.css';
import { useNavigate } from 'react-router-dom';

function ItemBasket(props) {
  const onRemove = props.onRemove ?? (() => {});
  const closeModal = props.onClose ?? (() => {});
  const item = props.item;

  const cn = bem('ItemBasket');

  const navigate = useNavigate();
  const handleProductTitleClick = useCallback(
    e => {
      e.preventDefault();
      closeModal();
      navigate(`/product/${item._id}`, { replace: true });
    },
    [navigate, item],
  );

  const callbacks = {
    onRemove: _ => onRemove(item._id),
    handleProductTitleClick: handleProductTitleClick,
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{item._id}</div>*/}
      <div className={cn('title')}>
        <a href={`/product/${item._id}`} onClick={callbacks.handleProductTitleClick}>
          {item.title}
        </a>
      </div>
      <div className={cn('right')}>
        <div className={cn('cell')}>{numberFormat(item.price)} ₽</div>
        <div className={cn('cell')}>{numberFormat(item.amount || 0)} шт</div>
        <div className={cn('cell')}>
          <button onClick={callbacks.onRemove}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

ItemBasket.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onRemove: propTypes.func,
  onClose: propTypes.func,
};

export default memo(ItemBasket);
