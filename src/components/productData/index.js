import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function ProductData({ productData, onAdd = _ => {} }) {
  const { _id, description, country, category, year, price } = productData;

  const cn = bem('ProductData');

  const callbacks = {
    onAdd: _ => onAdd(_id),
  };

  return (
    <div className={cn()}>
      <div className={cn('block', { description: true })}>{description}</div>
      <div className={cn('block', { country: true })}>
        <span>Страна производитель: </span>
        <strong>{country}</strong>
      </div>
      <div className={cn('block', { category: true })}>
        <span>Категория: </span>
        <strong>{category}</strong>
      </div>
      <div className={cn('block', { year: true })}>
        <span>Год выпуска: </span>
        <strong>{year}</strong>
      </div>
      <div className={cn('block', { price: true })}>
        <span>Цена: </span>
        <strong>{price} ₽</strong>
      </div>
      <div className={cn('block', { control: true })}>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

ProductData.propTypes = {
  productData: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string,
    year: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(ProductData);
