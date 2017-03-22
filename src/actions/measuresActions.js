import * as types from '../constants/actionTypes';
import { Parse } from 'parse';
import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';
import { forEach } from 'ramda';
import * as pollsActions from './pollsActions';
import pollTemplate from '../constants/pollTemplate';

export function loadMeasures() {
  return (dispatch, getState) => {
    const { measures } = getState();

    if (measures.length == 0) {
      const Measure = Parse.Object.extend("Measure");
      const query = new Parse.Query(Measure).include("user");

      query.find().then(
        forEach(result => dispatch(
          addMeasure(
            result.id,
            result.createdAt,
            result.get("name"),
            result.get("description"),
            result.get("user")
          )
        ))
      ).catch(
        () => Alert.error("Maßnahmen konnten nicht geladen werden")
      );
    }
  };
}

export function saveMeasure(name, description) {
  return dispatch => {
    const Measure = Parse.Object.extend("Measure");
    const measure = new Measure();

    measure.set('name', name);
    measure.set('description', description);
    measure.set('user', Parse.User.current());

    measure.save(null).then(
      measure => {
        dispatch(
          addMeasure(
            measure.id,
            measure.createdAt,
            name,
            description,
            Parse.User.current()
          )
        );
        dispatch(
          pollsActions.savePoll(
            pollTemplate.text,
            pollTemplate.questions,
            measure.id
          )
        );
        browserHistory.push(`/SIDATESecMaus/measure/${measure.id}`);
        Alert.success('Maßnahme erfolgreich angelegt');
      }
    ).catch(
      () => Alert.error('Maßnahme konnten nicht angelegt werden')
    );
  };
}

export function deleteMeasure(id) {
  return dispatch => {
    const Measure = Parse.Object.extend("Measure");
    const query = new Parse.Query(Measure);
    query.get(id).then(
      measure => {
        measure.destroy({});
        dispatch({
          type: types.DELETE_MEASURE,
          id: id
        });
        Alert.success('Maßnahme erfolgreich gelöscht');
        browserHistory.push('/SIDATESecMaus/measures');
      }
    ).catch(
      () => Alert.error('Maßnahme konnte nicht gelöscht werden')
    );
  };
}

export function editMeasure(id, name, description) {
  return dispatch => {
    const Measure = Parse.Object.extend("Measure");
    const query = new Parse.Query(Measure);

    query.get(id).then(
      measure => {
        measure.set('name', name);
        measure.set('description', description);
        return measure.save(null);
      }
    ).then(
      () => dispatch({
        type: types.EDIT_MEASURE,
        name: name,
        description: description,
        id: id
      })
    ).then(
      () => Alert.success('Maßnahme erfolgreich bearbeitet')
    ).catch(
      () => Alert.error('Maßnahme konnte nicht bearbeitet werden')
    );
  };
}

export function addMeasure(id, createdAt, name, description, createdBy) {
  return {
    type: types.ADD_MEASURE,
    name, createdAt, description, id, createdBy
  };
}
