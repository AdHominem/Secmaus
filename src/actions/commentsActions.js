import * as types from '../constants/actionTypes';
import { Parse } from 'parse';
import Alert from 'react-s-alert';
import {filter, propEq, forEach} from 'ramda';

export function loadComments() {
  return (dispatch, getState) => {
    const { comments } = getState();

    if (comments.length == 0) {
      const Comment = Parse.Object.extend("Comment");
      const query = new Parse.Query(Comment).include("user");

      query.find().then(
        forEach((result) => 
          dispatch(addComment(
            result.id,
            result.get("text"),
            result.get("parentID"),
            result.get("user"),
            result.get("createdAt")
          )))
      ).catch(
        () => Alert.error('Kommentare konnten nicht geladen werden')
      );
    }
  };
}

export function saveComment(text, parentID) {
  return dispatch => {
    const Comment = Parse.Object.extend("Comment");
    const comment = new Comment();

    comment.set('text', text);
    comment.set('user', Parse.User.current());
    comment.set('parentID', parentID);
    const now = new Date();
    comment.set('createdAt', now);

    comment.save(null).then(
      comment => dispatch(addComment(comment.id, text, parentID, Parse.User.current(), now))
    ).catch(
      () => Alert.error('Kommentar konnten nicht gespeichert werden')
    );
  };
}

export function editComment(id, text) {
  return dispatch => {
    const Comment = Parse.Object.extend("Comment");
    const query = new Parse.Query(Comment);

    query.get(id).then(
      (comment) => {
        comment.set('text', text);
        return comment.save(null);
      }
    ).then(
      () => dispatch({
        type: types.EDIT_COMMENT,
        text: text,
        id: id
      })
    ).catch(
      () => Alert.error('Kommentar konnte nicht bearbeitet werden')
    );
  };
}

export function addComment(id, text, parentID, user, createdAt) {
  return {
    type: types.ADD_COMMENT,
    text, parentID, id, user, createdAt
  };
}

export function deleteComment(id, comments, isNotRecursive = true) {
  return dispatch => {
    const Comment = Parse.Object.extend("Comment");
    const query = new Parse.Query(Comment);
    query.get(id).then(
      comment => {
        filter(propEq('parentID', comment.id), comments).
          forEach(child => dispatch(deleteComment(child.id, comments, false)));
        comment.destroy({});
        dispatch({
          type: types.DELETE_COMMENT,
          id: id
        });
        isNotRecursive && Alert.success('Kommentar erfolgreich gelöscht');
      },
    ).catch(() => Alert.error('Kommentar konnte nicht gelöscht werden'));
  };
}
