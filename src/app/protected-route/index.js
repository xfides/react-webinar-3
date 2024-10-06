import { Navigate, Outlet } from 'react-router-dom';
import { memo } from 'react';
import useSelector from '../../hooks/use-selector';

const ProtectedRoute = ({ redirectPath }) => {
  const select = useSelector(state => ({
    token: state.auth.token,
  }));

  return select.token ? <Outlet /> : <Navigate to={redirectPath} replace={true} />;
};
export default memo(ProtectedRoute);
