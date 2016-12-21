import * as types from '../constants/actionTypes';
import { Parse } from 'parse';

export function loadComments() {
  return function (dispatch) {
    const Comment = Parse.Object.extend("Comment");
    const query = new Parse.Query(Comment).include("user");

    query.find({
      success: function (results) {
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
      error: function (error) {
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
