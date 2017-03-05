import { reject, propEq, pick, append } from 'ramda';

import { ADD_QUESTION, ANSWER_QUESTION, DELETE_QUESTION, EDIT_QUESTION } from '../constants/actionTypes';
import { createReducer, updateById } from '../utils/ramda';

export default createReducer([], {
  [ADD_QUESTION]: (action) => append(pick(
    ['text', 'id', 'answers', 'choices', 'pollId', 'questionType', 'index'],
    action
  )),
  [EDIT_QUESTION]: (action) => updateById(action.id, {
    id: {$set: action.id},
    text: {$set: action.text},
    choices: {$set: action.choices}
  }),
  [ANSWER_QUESTION]: (action) => updateById(action.id, {
    answers: { $push: [[ action.userId, action.answerIndex ]] }
  }),
  [DELETE_QUESTION]: (action) => reject(propEq('id', action.id))
});
