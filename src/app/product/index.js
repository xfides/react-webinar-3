import { memo } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';

export function ProductLoader() {
  console.log('ProductLoader');

  return null
}

function Product() {
  console.log('Product component');

  return (
    <PageLayout>
      <Head title="Конкретный продукт" />
      <div>Информация о конкретном продукте</div>
    </PageLayout>
  );
}

export default memo(Product);
