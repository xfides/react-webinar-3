import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ListComments({
  caption = '',
  list = [],
  count = 0,
  lastError,
  renderItem = _ => {},
  children,
}) {
  const cn = bem('ListComments');

  return (
    <div className={cn()}>
      <h2 className={cn('header')}>{`${caption} (${count})`}</h2>
      <div className="error">{lastError || ''}</div>

      <div className={'list'}>
        {list.map(item => (
          <div key={item._id} className={cn('item')}>
            {renderItem(item)}
          </div>
        ))}
      </div>

      <div className={cn('extra')}>{children}</div>
    </div>
  );
}

ListComments.propTypes = {
  caption: PropTypes.string,
  list: PropTypes.array,
  count: PropTypes.number,
  lastError: PropTypes.string,
  renderItem: PropTypes.func,
  children: PropTypes.node,
};

export default memo(ListComments);
