import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import Input from '../input';
import { cn as bem } from '@bem-react/classname';

function AuthForm({ formConfig }) {
  const {
    captionLabel = '',
    waiting = false,
    fields = [],
    lastError = '',
    submitLabel = '',
    submitHandler = _ => {},
  } = formConfig;

  const cn = bem('AuthForm');

  return (
    <div className={cn()}>
      <h2 className={cn('caption')}>{captionLabel}</h2>

      <form className={cn('body')} onSubmit={submitHandler} action="#">
        {fields.map(oneField => {
          return (
            <div className={cn('block')} key={oneField.label}>
              <label htmlFor={oneField.name}>{oneField.label}</label>
              <Input
                id={oneField.name}
                name={oneField.name}
                type={oneField.type}
                value={oneField.value}
              />
            </div>
          );
        })}

        {lastError ? <div className={cn('block', { error: true })}>{lastError}</div> : null}

        <div className={cn('block', { wrapButtons: true })}>
          <button type="submit" disabled={waiting}>
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

AuthForm.propTypes = {
  formConfig: PropTypes.shape({
    captionLabel: PropTypes.string,
    waiting: PropTypes.bool,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
    lastError: PropTypes.string,
    submitLabel: PropTypes.string,
    submitHandler: PropTypes.func,
  }),
};

export default memo(AuthForm);
