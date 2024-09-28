import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { Link } from 'react-router-dom';

function validatePaginationData({ limit, pageIndex, dataCount, minIndex, maxIndex }) {
  return (
    limit !== 0 &&
    dataCount !== 0 &&
    limit < dataCount &&
    pageIndex >= minIndex &&
    pageIndex <= maxIndex
  );
}

function compressPaginationModel(paginationModel) {
  let prevItemContent = null;

  return paginationModel.filter(oneItem => {
    if (oneItem.content === prevItemContent) {
      prevItemContent = oneItem.content;
      return false;
    } else {
      prevItemContent = oneItem.content;
      return true;
    }
  });
}

function createPaginationModel({ limit = 0, pageIndex = 0, dataCount = 0 }) {
  const paginationModel = [];
  const minIndex = 0;
  const maxIndex = Math.ceil(dataCount / limit) - 1;
  const noLinkOffsetABS = 1;

  if (!validatePaginationData({ limit, pageIndex, dataCount, minIndex, maxIndex })) {
    return paginationModel;
  }

  for (let i = minIndex; i <= maxIndex; i++) {
    if (i === pageIndex) {
      paginationModel.push({ active: true, link: false, content: i + 1, key: i });
      continue;
    }

    if (i === minIndex || i === maxIndex) {
      paginationModel.push({ active: false, link: true, content: i + 1, key: i });
      continue;
    }

    if (i >= pageIndex - noLinkOffsetABS && i <= pageIndex + noLinkOffsetABS) {
      paginationModel.push({ active: false, link: true, content: i + 1, key: i });
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
          <Link to={`/main/${oneModelItem.key}`}>{oneModelItem.content}</Link>
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
    pageIndex: PropTypes.number,
    dataCount: PropTypes.number,
  }),
};

export default memo(Pagination);
