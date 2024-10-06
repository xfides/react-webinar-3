import { memo, useCallback } from 'react';
import UserHeaderView from '../../components/user-header-view';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import useTranslate from '../../hooks/use-translate';
import { useLocation, useNavigate } from 'react-router-dom';

function UserHeaderControl() {
  const store = useStore();
  const { t } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector(state => ({
    token: state.auth.token,
    name: state.auth.profile.name,
  }));

  const callbacks = {
    redirectToAuth: useCallback(
      _ => {
        if (location.pathname !== '/auth') {
          navigate('/auth');
        }
      },
      [store],
    ),
    signOut: useCallback(_ => store.actions.auth.signOut(), [store]),
  };

  const UserHeaderViewProps = {
    linkNameLabel: select.token ? select.name : '',
    linkNamePath: '/profile',
    buttonHandler: select.token ? callbacks.signOut : callbacks.redirectToAuth,
    buttonLabel: select.token ? t('logout') : t('login'),
  };

  return <UserHeaderView {...UserHeaderViewProps} />;
}

export default memo(UserHeaderControl);
