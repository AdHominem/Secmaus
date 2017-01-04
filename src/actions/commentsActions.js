import * as types from '../constants/actionTypes';
import { Parse } from 'parse';
import Alert from 'react-s-alert';


export function loadComments() {
  return dispatch => {
    const Comment = Parse.Object.extend("Comment");
    const query = new Parse.Query(Comment).include("user");

    query.find({
      success: results => {
        for (let i = 0; i < results.length; i++) {
          const result = results[i];
          dispatch(addComment(
            result.id,
            result.get("text"),
            result.get("parentID"),
            result.get("user")
          ));
        }
      },
      error: error => {
        console.log(error);
      }
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

    console.dir(Parse.User.current());

    comment.save(null, {
      success: comment => {
        dispatch(addComment(comment.id, text, parentID, Parse.User.current()));
        //browserHistory.push(`/measure/${comment.parentID}`);
      },
      error: (comment, error) => {
        console.log(error);
      }
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
          error: error => {
            console.log(error);
          }
        });
      },
      error: error => {
        console.log(error);
      }
    });
  };
}

export function addComment(id, text, parentID, user) {
  return {
    type: types.ADD_COMMENT,
    text: text,
    parentID: parentID,
    id: id,
    user: user
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
      error: (comment, error) => {
        Alert.error('Kommentar konnte nicht gelöscht werden');
      }
    });
  };
}
