import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List(rawProps) {
  const props = {
    list: rawProps.list,
    onDeleteItem: rawProps.onDeleteItem ? rawProps.onDeleteItem : () => {},
    onSelectItem: rawProps.onSelectItem ? rawProps.onSelectItem : () => {},
  };

  return (
    <div className="List">
      {props.list.map(item => (
        <div key={item.code} className="List-item">
          <Item item={item} onDelete={props.onDeleteItem} onSelect={props.onSelectItem} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
};

export default React.memo(List);
