import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat } from '../../utils';
import './style.css';
import { Link } from 'react-router-dom';

function Item(props) {
  let { item, onAdd } = props;
  item = item ?? {};
  onAdd = onAdd ?? (() => {});

  const cn = bem('Item');

  const callbacks = {
    onAdd: _ => onAdd(item._id),
  };

  return (
    <div className={cn()}>
      <div className={cn('title')}>
        <Link to={`/product/${item._id}`}>{item.title}</Link>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(Item);
