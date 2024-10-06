import { memo, useMemo, useState } from 'react';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import { Navigate } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import Spinner from '../../components/spinner';
import AuthForm from '../../components/authForm';
import useTranslate from '../../hooks/use-translate';

function Auth() {
  const store = useStore();
  const { t, lang } = useTranslate();

  const select = useSelector(state => ({
    token: state.auth.token,
    waiting: state.auth.waiting,
    lastError: state.auth.lastError,
  }));

  const [fieldsValues, setFieldsValues] = useState({
    login: '',
    password: '',
  });

  const formConfig = useMemo(
    () => ({
      captionLabel: t('login'),
      waiting: select.waiting,
      fields: [
        {
          name: 'login',
          type: 'text',
          label: t('loginLabel'),
          value: fieldsValues['login'],
        },
        {
          name: 'password',
          type: 'password',
          label: t('passwordLabel'),
          value: fieldsValues['password'],
        },
      ],
      lastError: select.lastError,
      submitLabel: t('submitLabel'),
      submitHandler: event => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);
        const values = Object.fromEntries(data.entries());

        if (values['login'] && values['password']) {
          setFieldsValues({
            login: values['login'],
            password: values['password'],
          });
          void store.actions.auth.signIn({
            login: values['login'],
            password: values['password'],
          });
        }
      },
    }),
    [select.waiting, fieldsValues, lang],
  );

  if (select.token) return <Navigate to="/" replace={true} />;

  return (
    <PageLayout>
      <Head title={t('authentication')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <AuthForm formConfig={formConfig} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Auth);
