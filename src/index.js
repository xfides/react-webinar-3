import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Main, { MainLoader } from './app/main';
import Product, { ProductLoader } from './app/product';
import Error from './components/error';

const store = new Store();

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  { path: '/', element: <Navigate to={'/main'} /> },
  {
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/main/:pageNum?',
        element: <Main />,
        loader: MainLoader,
      },
      {
        path: '/product/:id',
        element: <Product />,
        loader: ProductLoader,
      },
    ],
  },
  { path: '*', element: <Error /> },
]);

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>,
);
