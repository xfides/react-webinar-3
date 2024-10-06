import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function ProfileView({ userInfo }) {
  const { fields = [], captionLabel = '', lastError = '' } = userInfo;
  const cn = bem('ProfileView');

  return (
    <div className={cn()}>
      <h2 className={cn('caption')}>{captionLabel}</h2>
      <ul className={cn('list')}>
        {lastError ? (
          <li className={cn('item', { error: true })} key="error">
            <span className={cn('itemLabel')}>{`error: `}</span>
            <span className={cn('itemValue')}>{lastError}</span>
          </li>
        ) : (
          fields.map(oneField => {
            return (
              <li className={cn('item')} key={oneField.label}>
                <span className={cn('itemLabel')}>{`${oneField.label}: `}</span>
                <span className={cn('itemValue')}>{`${oneField.value || '-'}`}</span>
              </li>
            );
          })
        )}
      </ul>
    </div>
  );
}

ProfileView.propTypes = {
  userInfo: PropTypes.shape({
    captionLabel: PropTypes.string,
    lastError: PropTypes.string,
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
  }),
};

export default memo(ProfileView);
