import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './app.js';
import store from './store.js';

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);
