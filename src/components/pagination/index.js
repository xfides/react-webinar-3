import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function validatePaginationData({ limit, userPageNum, dataCount, minUserPageNum, maxUserPageNum }) {
  return (
    limit !== 0 &&
    dataCount !== 0 &&
    limit < dataCount &&
    userPageNum >= minUserPageNum &&
    userPageNum <= maxUserPageNum
  );
}

function compressPaginationModel(paginationModel) {
  let prevItemContent = null;

  return paginationModel.filter(oneItem => {
    const isDuplicate = oneItem.content === prevItemContent;
    prevItemContent = oneItem.content;
    return !isDuplicate;
  });
}

function createPaginationModel({ limit = 0, userPageNum = 1, dataCount = 0 }) {
  const paginationModel = [];
  const minUserPageNum = 1;
  const maxUserPageNum = Math.ceil(dataCount / limit);
  const noLinkOffsetABS = 1;

  if (!validatePaginationData({ limit, userPageNum, dataCount, minUserPageNum, maxUserPageNum })) {
    return paginationModel;
  }

  for (let i = minUserPageNum; i <= maxUserPageNum; i++) {
    if (i === userPageNum) {
      paginationModel.push({ active: true, link: false, content: i, key: i });
      continue;
    }

    if (i === minUserPageNum || i === maxUserPageNum) {
      paginationModel.push({ active: false, link: true, content: i, key: i });
      continue;
    }

    if (i >= userPageNum - noLinkOffsetABS && i <= userPageNum + noLinkOffsetABS) {
      paginationModel.push({ active: false, link: true, content: i, key: i });
    } else {
      paginationModel.push({ active: false, link: false, content: '...', key: i });
    }
  }

  return compressPaginationModel(paginationModel);
}

function createPaginationItems(paginationModel, cn) {
  return paginationModel.map(oneModelItem => {
    if (oneModelItem.active) {
      return (
        <li className={cn('item', { active: true })} key={oneModelItem.key}>
          <span>{oneModelItem.content}</span>
        </li>
      );
    }

    if (oneModelItem.link) {
      return (
        <li className={cn('item', { link: true })} key={oneModelItem.key}>
          <Link to={`/main/${oneModelItem.content}`}>{oneModelItem.content}</Link>
        </li>
      );
    }

    if (!oneModelItem.link) {
      return (
        <li className={cn('item')} key={oneModelItem.key}>
          <span>{oneModelItem.content}</span>
        </li>
      );
    }
  });
}

function Pagination({ pagination } = {}) {
  const paginationModel = createPaginationModel(pagination);
  if (paginationModel.length === 0) return null;

  const cn = bem('Pagination');
  const paginationItems = createPaginationItems(paginationModel, cn);

  return (
    <div className={cn()}>
      <ul className={cn('list')}>{paginationItems}</ul>
    </div>
  );
}

Pagination.propTypes = {
  pagination: PropTypes.shape({
    limit: PropTypes.number,
    userPageNum: PropTypes.number,
    dataCount: PropTypes.number,
  }),
};

export default memo(Pagination);
