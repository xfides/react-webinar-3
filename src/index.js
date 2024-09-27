import { createRoot } from 'react-dom/client';
import App from './app';
import Store from './store';
import { StoreContext } from './store/context';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import Main, { MainLoader } from './app/main'
import Product, { ProductLoader } from './app/product'

const store = new Store();

const root = createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  { path: '/', element: <Navigate to={'/main'} /> },
  {
    element: <App />,
    children: [
      {
        path: '/main/:pageNum?',
        element: <Main />,
        loader: MainLoader
      },
      {
        path: '/product/:id',
        element: <Product />,
        loader: ProductLoader
      },
    ],
  },
]);

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <RouterProvider router={router} />
  </StoreContext.Provider>,
);
