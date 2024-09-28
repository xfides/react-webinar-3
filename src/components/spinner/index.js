import { memo } from 'react';
import { cn as bem } from '@bem-react/classname';
import './style.css';
import { createPortal } from 'react-dom';

function Spinner() {
  const cn = bem('Spinner');

  return createPortal(<div className={cn()}>Loading...</div>, document.body);
}

export default memo(Spinner);
