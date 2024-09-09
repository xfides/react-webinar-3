import { generateItemCode } from './utils'

const initialData = {
  list: [
    { title: 'Название элемента' },
    { title: 'Некий объект' },
    { title: 'Заголовок' },
    { title: 'Очень длинное название элемента из семи слов' },
    { title: 'Запись' },
    { title: 'Шестая запись' },
    { title: 'Седьмая запись' },
  ],
}

const normalizedItems = initialData.list.map((oneItem) => {
  return {
    ...oneItem,
    selected: false,
    code: generateItemCode(),
    highlightCount: 0,
  }
})

export const initialState = {
  ...initialData,
  list: normalizedItems,
}
