// Начальное состояние
export const initialState = {
  data: {},
  activeParentId:'',
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {}, waiting: true, activeParentId: '' };

    case 'comments/load-success':
      return { ...state, data: action.payload.data, activeParentId: action.payload.activeParentId , waiting: false };

    case 'comments/load-error':
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
