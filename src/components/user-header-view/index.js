import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import { Link } from 'react-router-dom';

function UserHeaderView({
  linkNameLabel = '',
  linkNamePath = '',
  buttonHandler = _ => {},
  buttonLabel = '',
}) {
  const cn = bem('UserHeaderView');

  return (
    <div className={cn()}>
      <div className={cn('block', { wrapLinks: true })}>
        {linkNameLabel ? <Link to={linkNamePath}>{linkNameLabel}</Link> : null}
      </div>

      <div className={cn('block', { wrapButtons: true })}>
        <button className={cn('button')} onClick={buttonHandler}>
          {buttonLabel}
        </button>
      </div>
    </div>
  );
}

UserHeaderView.propTypes = {
  linkNameLabel: PropTypes.string,
  linkNamePath: PropTypes.string,
  buttonHandler: PropTypes.func,
  buttonLabel: PropTypes.string,
};

export default memo(UserHeaderView);
