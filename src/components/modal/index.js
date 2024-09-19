import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { bem } from '../../utils';
import { PT_MODAL } from '../../propTypesShare';
import { createPortal } from 'react-dom';
import { ACTION } from '../../store';

function useEscClose({ isOpen }) {
  useEffect(() => {
    function escHandler(evt) {
      if (isOpen && evt.key === 'Escape') ACTION.toggleModal();
    }

    document.body.addEventListener('keydown', escHandler);

    return function cleanUp() {
      document.body.removeEventListener('keydown', escHandler);
    };
  }, [isOpen]);
}

function Modal({ title, modal, children }) {
  useEscClose(modal);

  const cn = bem('Modal');

  return createPortal(
    <div className={cn({ opened: modal.isOpen })} onClick={ACTION.toggleModal}>
      <div
        className={cn('inner', { opened: modal.isOpen })}
        onClick={evt => evt.stopPropagation()}
      >
        <div className={cn('head')}>
          <h2>{title}</h2>
          <div className="buttons">
            <button onClick={ACTION.toggleModal}>Закрыть</button>
          </div>
        </div>

        <div className={cn('content')}>{children}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.propTypes = {
  title: PropTypes.node,
  modal: PT_MODAL,
  children: PropTypes.node,
};

export default React.memo(Modal);
