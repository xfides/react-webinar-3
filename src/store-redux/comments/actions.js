const ActionType = {
  COMMENTS_LOAD_START: 'comments/load-start',
  COMMENTS_LOAD_SUCCESS: 'comments/load-success',
  COMMENTS_LOAD_ERROR: 'comments/load-error',
  COMMENTS_SET_ACTIVE_PARENT_ID: 'comments/setActiveParentId',
  COMMENTS_SEND_START: 'comments/send-start',
  COMMENTS_SEND_SUCCESS: 'comments/send-success',
  COMMENTS_SEND_ERROR: 'comments/send-error',
};

const actions = {
  load: articleId => {
    return async (dispatch, getState, services) => {
      dispatch({ type: ActionType.COMMENTS_LOAD_START });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${articleId}`,
        });

        dispatch({
          type: ActionType.COMMENTS_LOAD_SUCCESS,
          payload: { data: res.data.result, activeParentId: articleId },
        });
      } catch (e) {
        dispatch({
          type: ActionType.COMMENTS_LOAD_ERROR,
          payload: typeof e === 'string' ? e : e.msg || e.message,
        });
      }
    };
  },

  setActiveParentId: activeParentId => ({
    type: ActionType.COMMENTS_SET_ACTIVE_PARENT_ID,
    payload: activeParentId,
  }),

  send: ({ articleId, parentId, text }) => {
    return async (dispatch, getState, services) => {
      dispatch({ type: ActionType.COMMENTS_SEND_START });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify({
            text: text,
            parent: {
              _id: parentId,
              _type: parentId === articleId ? 'article' : 'comment',
            },
          }),
        });

        if (res.data?.result) {
          dispatch(actions.load(ActionType.COMMENTS_SEND_SUCCESS));
          dispatch(actions.load(articleId));
        } else {
          dispatch({
            type: ActionType.COMMENTS_SEND_ERROR,
            payload: res?.error?.data?.issues?.[0]?.message || 'unknown error sending comment',
          });
        }
      } catch (e) {
        dispatch({
          type: ActionType.COMMENTS_SEND_ERROR,
          payload: typeof e === 'string' ? e : e.msg || e.message,
        });
      }
    };
  },
};

export default actions;
export { ActionType };
