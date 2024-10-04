import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';

function normalizeCategories(categories) {
  // нормализуем данные одной категории
  const categoriesById = categories.reduce((acc, categoryObj) => {
    categoryObj.children = [];
    categoryObj.nestingIndex = -1;
    acc[categoryObj._id] = categoryObj;
    return acc;
  }, {});

  // добавляем _id дочерних категорий в поле children родительской
  for (const id in categoriesById) {
    const category = categoriesById[id];

    if (!category.parent) continue;

    const parentCategoryId = category.parent._id;
    categoriesById[parentCategoryId].children.push(id);
  }

  // расставляем категории в порядке user\visual вложенности
  let nestingIndex = -1;
  const visitedCategories = new Set();
  const sortedCategoriesByNesting = {};

  function handleCategory(categoryObj) {
    if (visitedCategories.has(categoryObj)) return;

    ++nestingIndex;
    categoryObj.nestingIndex = nestingIndex;
    sortedCategoriesByNesting[categoryObj._id] = categoryObj;

    categoryObj.children.forEach(childId => {
      const childCategory = categoriesById[childId];
      handleCategory(childCategory);
    });

    --nestingIndex;
  }

  // начинаем обход с categories у которых parent === null
  const rootCategories = categories.filter(oneCategory => oneCategory.parent === null);
  rootCategories.forEach(oneRootCategory => {
    handleCategory(oneRootCategory);
  });

  return sortedCategoriesByNesting;
}

function getCategoriesOptions(categories) {
  const selectCategoryOptions = categories.map(oneCategory => {
    const categoryPrefix = new Array(oneCategory.nestingIndex).fill('- ').join('');
    return {
      value: oneCategory._id,
      title: `${categoryPrefix}${oneCategory.title}`,
    };
  });

  selectCategoryOptions.unshift({
    value: '',
    title: `Все`,
  });

  return selectCategoryOptions;
}

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  // Категории нужны только в компоненте фильтров и только 1 раз
  const [categories, setCategories] = useState({});
  useEffect(() => {
    store.actions.catalog
      .loadCategories()
      .then(categoriesData => {
        setCategories(normalizeCategories(categoriesData.result.items));
      })
      .catch(_ => {
        setCategories({});
      });
  }, []);

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
  }));

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
    // Смена категории
    onCategoryChange: useCallback(
      category => store.actions.catalog.setParams({ category, page: 1 }),
      [store],
    ),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Select
        options={getCategoriesOptions(Object.values(categories))}
        value={select.category}
        onChange={callbacks.onCategoryChange}
      />
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
