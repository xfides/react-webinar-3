import { memo, useCallback } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import { getItemById } from '../../api';
import { useLoaderData, useNavigation } from 'react-router-dom';
import BasketTool from '../../components/basket-tool';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductData from '../../components/productData';
import Spinner from '../../components/spinner';

export async function ProductLoader({ params }) {
  const responseData = await getItemById(params.id);

  if (responseData.error) {
    throw new Error(responseData.error.message);
  }

  return responseData.result;
}

function compressProductData(rawProductData) {
  const NOT_SPECIFIED_STRING = 'не указано';
  const NOT_SPECIFIED_NUMBER = 0;

  return {
    _id: rawProductData._id,
    title: rawProductData?.title ?? NOT_SPECIFIED_STRING,
    description: rawProductData?.description ?? NOT_SPECIFIED_STRING,
    country: rawProductData?.madeIn?.title ?? NOT_SPECIFIED_STRING,
    category: rawProductData?.category?.title ?? NOT_SPECIFIED_STRING,
    year: rawProductData?.edition ?? NOT_SPECIFIED_NUMBER,
    price: rawProductData?.price ?? NOT_SPECIFIED_NUMBER,
  };
}

function Product() {
  let productData = useLoaderData();
  productData = compressProductData(productData);
  const navigation = useNavigation();
  const store = useStore();

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title={productData.title} />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      <ProductData productData={productData} onAdd={callbacks.addToBasket} />
      {navigation.state === 'loading' && <Spinner />}
    </PageLayout>
  );
}

export default memo(Product);
