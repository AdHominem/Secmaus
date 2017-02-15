import * as types from '../constants/actionTypes';
import { Parse } from 'parse';
import Alert from 'react-s-alert';

export function loadComments() {
  return dispatch => {
    const Comment = Parse.Object.extend("Comment");
    const query = new Parse.Query(Comment).include("user");

    query.find({
      success: results => {
        results.forEach(result => {
          dispatch(addComment(
            result.id,
            result.get("text"),
            result.get("parentID"),
            result.get("user"),
            result.get("createdAt")
          ))
        })
      },
      error: () => Alert.error('Kommentare konnten nicht geladen werden')
    });
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

    comment.save(null, {
      success: comment => {
        dispatch(addComment(comment.id, text, parentID, Parse.User.current(), now));
      },
      error: () => Alert.error('Kommentar konnten nicht gespeichert werden')
    });
  };
}

export function editComment(id, text) {
  return dispatch => {
    const Comment = Parse.Object.extend("Comment");
    const query = new Parse.Query(Comment);

    query.get(id, {
      success: comment => {
        comment.set('text', text);
        comment.save(null, {
          success: () => {
            dispatch(
              {
                type: types.EDIT_COMMENT,
                text: text,
                id: id
              }
            );
          },
          error: () => Alert.error('Zu bearbeitender Kommentar konnten nicht geladen werden')
        });
      },
      error: () => Alert.error('Zu bearbeitender Kommentar konnten nicht gespeichert werden')
    });
  };
}

export function addComment(id, text, parentID, user, createdAt) {
  return {
    type: types.ADD_COMMENT,
    text, parentID, id, user, createdAt
  };
}

export function deleteComment(id) {
  return dispatch => {
    const Comment = Parse.Object.extend("Comment");
    const query = new Parse.Query(Comment);
    query.get(id, {
      success: comment => {
        comment.destroy({});
        dispatch({
          type: types.DELETE_COMMENT,
          id: id
        });
        Alert.success('Kommentar erfolgreich gelöscht');
      },
      error: () => Alert.error('Kommentar konnte nicht gelöscht werden')
    });
  };
}
