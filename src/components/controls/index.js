import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls(rawProps) {
  const props = {
    onAdd: rawProps.onAdd ? rawProps.onAdd : () => {},
  };

  return (
    <div className="Controls">
      <button onClick={props.onAdd}>Добавить</button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

export default React.memo(Controls);
