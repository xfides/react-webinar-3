import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { getItemsPerPageIndex } from '../../api';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Spinner from '../../components/spinner';

export async function MainLoader({ params }) {
  const userPageNum = params.userPageNum ?? 1;
  const indexPageNum = userPageNum - 1;

  const responseData = await getItemsPerPageIndex(indexPageNum);

  if (responseData.error) {
    throw new Error(responseData.error.message);
  }

  responseData.result.userPageNum = Number(userPageNum);
  return responseData.result;
}

function Main() {
  const { count = 0, items = [], userPageNum = 1 } = useLoaderData();
  const navigation = useNavigation();
  const store = useStore();

  useEffect(() => {
    store.actions.catalog.setData(items);
    store.actions.pagination.updatePagination({
      userPageNum: userPageNum,
      dataCount: count,
    });
  }, [items, userPageNum, count]);

  const select = useSelector(state => ({
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    pagination: state.pagination,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        return <Item item={item} onAdd={callbacks.addToBasket} />;
      },
      [callbacks.addToBasket],
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <List list={select.list} renderItem={renders.item} />
      <Pagination pagination={select.pagination} />
      {navigation.state === 'loading' && <Spinner />}
    </PageLayout>
  );
}

export default memo(Main);
