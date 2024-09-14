import { generateItemCode } from './utils'

const initialData = {
  list: [
    { code: 1, title: 'Название элемента' },
    { code: 2, title: 'Некий объект' },
    { code: 3, title: 'Заголовок' },
    { code: 4, title: 'Очень длинное название элемента из семи слов' },
    { code: 5, title: 'Запись' },
    { code: 6, title: 'Шестая запись' },
    { code: 7, title: 'Седьмая запись' },
  ],
}

const normalizedItems = initialData.list.map((oneItem) => {
  return {
    ...oneItem,
    selected: false,
    highlightCount: 0,
  }
})

export const initialState = {
  ...initialData,
  list: normalizedItems,
}
