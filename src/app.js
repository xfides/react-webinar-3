import React from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import { PT_CART, PT_MODAL, PT_ONE_GOOD } from './propTypesShare';
import PropTypes from 'prop-types';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const state = store.getState();
  const { list, cart } = state;

  return (
    <PageLayout>
      <Head title="Приложение на чистом JS" />
      <Controls cart={cart} />
      <List list={list} />
    </PageLayout>
  );
}

// DO NOT WORK! Maybe bug in React or Webpack or PropTypes
/*
App.propTypes = PropTypes.shape({
  store: PropTypes.shape({
    state: PropTypes.shape({
      list: PropTypes.arrayOf(PT_ONE_GOOD),
      cart: PT_CART,
      modal: PT_MODAL,
    }),
    getState: PropTypes.func,
    setState: PropTypes.func,
    subscribe: PropTypes.func,
  }),
});
*/

export default App;
