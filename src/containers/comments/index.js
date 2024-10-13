import { memo, useCallback, useMemo } from 'react';
import { useDispatch, useSelector as useSelectorRedux } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import shallowequal from 'shallowequal';
import useInit from '../../hooks/use-init';
import commentsActions from '../../store-redux/comments/actions';
import Spinner from '../../components/spinner';
import ListComments from '../../components/list-comments';
import ItemComment from '../../components/item-comment';
import treeToList from '../../utils/tree-to-list';
import listToTree from '../../utils/list-to-tree';
import useSelector from '../../hooks/use-selector';
import FormComment from '../../components/form-comment';
import useTranslate from '../../hooks/use-translate';
import formatCommentDate from '../../utils/formatCommentDate';
import MaybeFormComment from '../../components/maybe-form-comment';

function Comments() {
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const { t, lang } = useTranslate();

  useInit(() => dispatch(commentsActions.load(params.id)), [params.id]);

  const selectCommentsInfo = useSelectorRedux(state => {
    return state.comments;
  }, shallowequal);

  const { data, activeParentId, waiting, lastError } = selectCommentsInfo;
  const { items = [], count = 0 } = data;

  const comments = useMemo(() => {
    const rootComments = listToTree(items)[0]?.children || [];
    return treeToList(rootComments, (item, level) => {
      item.nestingLevel = level;
      item.formattedDate = formatCommentDate(item.dateCreate, lang);
      return item;
    });
  }, [items, lang]);

  const isSessionExists = useSelector(state => state.session.exists);

  const callbacks = useMemo(() => {
    return {
      setArticleParentId: e => {
        e.preventDefault();
        dispatch(commentsActions.setActiveParentId(params.id));
      },
      setCommentParentId: activeParentId =>
        dispatch(commentsActions.setActiveParentId(activeParentId)),
      submitComment: e => {
        e.preventDefault();

        const data = new FormData(e.currentTarget);
        const values = Object.fromEntries(data.entries());
        const commentText = values.userComment.trim();

        if (!commentText || !activeParentId) return;

        dispatch(
          commentsActions.send({
            articleId: params.id,
            parentId: activeParentId,
            text: commentText,
          }),
        );
      },
    };
  }, [params.id, activeParentId]);

  const components = {
    notMatchIdCommentOnComment: null,
    notMatchIdCommentOnArticle: null,
    noSessionCommentOnComment: (
      <div>
        <Link to="/login" state={{ back: location.pathname }}>
          Войдите
        </Link>
        , чтобы иметь возможность ответить.&nbsp;
        <Link to="." reloadDocument={true} onClick={callbacks.setArticleParentId}>
          Отмена
        </Link>
      </div>
    ),
    noSessionCommentOnArticle: (
      <div>
        <Link to="/login" state={{ back: location.pathname }}>
          Войдите
        </Link>
        , чтобы иметь возможность комментировать
      </div>
    ),
  };

  const renders = {
    comment: useCallback(
      comment => {
        return (
          <ItemComment commentInfo={comment} replyCallback={callbacks.setCommentParentId}>
            <MaybeFormComment
              isSessionExists={isSessionExists}
              activeParentId={activeParentId}
              ownId={comment._id}
              notMatchIdComponent={components.notMatchIdCommentOnComment}
              noSessionComponent={components.noSessionCommentOnComment}
              yesAllComponent={
                <FormComment
                  caption={t('comments.newCaptionOnComment')}
                  waiting={waiting}
                  cancelReplyCallback={callbacks.setArticleParentId}
                  submitCallback={callbacks.submitComment}
                />
              }
            />
          </ItemComment>
        );
      },
      [isSessionExists, activeParentId, lang, waiting],
    ),
  };

  return (
    <Spinner active={waiting}>
      <ListComments
        caption={t('comments.caption')}
        list={comments}
        count={count}
        lastError={lastError}
        renderItem={renders.comment}
      >
        <MaybeFormComment
          isSessionExists={isSessionExists}
          activeParentId={activeParentId}
          ownId={params.id}
          notMatchIdComponent={components.notMatchIdCommentOnArticle}
          noSessionComponent={components.noSessionCommentOnArticle}
          yesAllComponent={
            <FormComment
              caption={t('comments.newCaptionOnArticle')}
              waiting={waiting}
              submitCallback={callbacks.submitComment}
            />
          }
        />
      </ListComments>
    </Spinner>
  );
}

export default memo(Comments);
