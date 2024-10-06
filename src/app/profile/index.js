import { memo } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import Navigation from '../../containers/navigation';
import ProfileView from '../../components/profile-view';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import useInit from '../../hooks/use-init';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';

function Profile() {
  const store = useStore();
  const { t } = useTranslate();

  useInit(() => {
    void store.actions.auth.getUserProfile();
  });

  const select = useSelector(state => ({
    profile: state.auth.profile,
    lastError: state.auth.lastError,
    waiting: state.auth.waiting,
  }));

  const ProfileViewProps = {
    captionLabel: t('profile'),
    lastError: select.lastError,
    fields: Object.entries(select.profile).map(([label, value]) => ({ label, value })),
  };

  return (
    <PageLayout>
      <Head title={t('profile')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={select.waiting}>
        <ProfileView userInfo={ProfileViewProps} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Profile);
