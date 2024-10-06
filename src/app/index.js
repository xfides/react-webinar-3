import { Routes, Route } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Auth from './auth';
import Profile from './profile';
import ProtectedRoute from './protected-route';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const activeModal = useSelector(state => state.modals.name);

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/auth'} element={<Auth />} />
        <Route element={<ProtectedRoute redirectPath="/auth" />}>
          <Route path={'/profile'} element={<Profile />} />
        </Route>
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
