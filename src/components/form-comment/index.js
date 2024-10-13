import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function FormComment({
  caption = '',
  waiting = false,
  cancelReplyCallback,
  submitCallback = _ => {},
}) {
  const cn = bem('FormComment');

  return (
    <form className={cn()} action="#" onSubmit={submitCallback}>
      <h3 className={cn('caption')}>{caption}</h3>
      <div className={cn('main')}>
        <textarea className={cn('textarea')} name="userComment" id="userComment"></textarea>
      </div>
      <div className={cn('controls')}>
        <button disabled={waiting}>Отправить</button>
        {cancelReplyCallback ? <button onClick={cancelReplyCallback}>Отмена</button> : null}
      </div>
    </form>
  );
}

FormComment.propTypes = {
  caption: PropTypes.string,
  cancelReplyCallback: PropTypes.func,
  submitCallback: PropTypes.func,
  waiting: PropTypes.bool,
};

export default memo(FormComment);
