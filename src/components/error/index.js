import { Link, useRouteError } from 'react-router-dom';
import PageLayout from '../page-layout';
import Head from '../head';
import { memo } from 'react';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function Error() {
  const error = useRouteError();
  const cn = bem('Error');

  return (
    <PageLayout>
      <Head title="Упс, ошибка" />

      <div className={cn()}>
        <div className={cn('block')}>
          <p>
            Что-то пошло не так. Обратитесь к администратору. Сообщите ему информацию,
            представленную ниже (если она есть), чтобы быстрее решить вашу проблему!
          </p>
          <p>
            <i>{error?.statusText || error?.message}</i>
          </p>
        </div>
        <div className={cn('block')}>
          <p>Вы также можете вернуться на главную страницу сайта и попробовать еще раз!</p>
          <div className={cn('wrapLink')}>
            <Link to={'/main'}>На главную</Link>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default memo(Error);
