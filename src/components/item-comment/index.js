import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ItemComment({ commentInfo, replyCallback, children }) {
  const { author, formattedDate, text, nestingLevel, _id } = commentInfo;
  const userName = author?.profile?.name || '';
  const normalizedNestingLevel = Math.min(nestingLevel, 7);

  const cn = bem('ItemComment');
  return (
    <div className={cn()} style={{ paddingLeft: `${normalizedNestingLevel * 30}px` }}>
      <div className={cn('base')}>
        <div className={cn('header')}>
          <span className={cn('userName')}>{userName}</span>
          <span className={cn('date')}>{formattedDate}</span>
        </div>
        <div className={cn('main')}>{text}</div>
        <div className={cn('footer')}>
          <button onClick={() => replyCallback(_id)}>Ответить</button>
        </div>
      </div>

      <div className={cn('extra')}>{children}</div>
    </div>
  );
}

ItemComment.propTypes = {
  commentInfo: PropTypes.shape({
    author: PropTypes.shape({
      profile: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
    formattedDate: PropTypes.string,
    text: PropTypes.string,
    nestingLevel: PropTypes.number,
    _id: PropTypes.string,
  }),
  replyCallback: PropTypes.func,
  children: PropTypes.node,
};

export default memo(ItemComment);
