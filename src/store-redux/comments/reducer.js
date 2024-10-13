import { ActionType } from './actions';

// Начальное состояние
export const initialState = {
  data: {},
  activeParentId: '',
  waiting: false,
  lastError: '',
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case ActionType.COMMENTS_LOAD_START:
      return {
        ...state,
        data: {},
        waiting: true,
        activeParentId: '',
        lastError: '',
      };

    case ActionType.COMMENTS_LOAD_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        activeParentId: action.payload.activeParentId,
        waiting: false,
        lastError: '',
      };

    case ActionType.COMMENTS_LOAD_ERROR:
      return { ...state, data: {}, waiting: false, lastError: action.payload };

    //    ----

    case ActionType.COMMENTS_SET_ACTIVE_PARENT_ID:
      return {
        ...state,
        activeParentId: action.payload,
      };

    //    ----

    case ActionType.COMMENTS_SEND_START:
      return { ...state, waiting: true, lastError: '' };

    case ActionType.COMMENTS_SEND_SUCCESS:
      return { ...state, waiting: false, lastError: '' };

    case ActionType.COMMENTS_SEND_ERROR:
      return { ...state, waiting: false, lastError: action.payload };

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
