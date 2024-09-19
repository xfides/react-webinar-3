import PropTypes from 'prop-types';

/*
This is ready propTypes, commonly reused in different parts of application

Components with their personal own data have own propTypes,
defined in their component files

PT - means PropTypes
*/

export const PT_MODAL = PropTypes.shape({
  isOpen: PropTypes.bool,
});

export const PT_CART = PropTypes.objectOf(
  PropTypes.shape({
    code: PropTypes.number,
    count: PropTypes.number,
  }),
);

export const PT_ONE_GOOD = PropTypes.shape({
  code: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.number,
});
