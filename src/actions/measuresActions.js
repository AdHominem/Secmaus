import * as types from '../constants/actionTypes';
import { Parse } from 'parse';
import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';

export function loadMeasures() {
  console.log("Loading measures");
  return function (dispatch, getState) {
    const Measure = Parse.Object.extend("Measure");
    const query = new Parse.Query(Measure).include("user");

    const {measuresReducer} = getState();

    if (!measuresReducer.loaded) {
      query.find({
        success: function (results) {
          for (let i = 0; i < results.length; i++) {
            const result = results[i];
            // TODO: Remove this once all measures have an associated user
            dispatch(addMeasure(
              result.id,
              result.get("name"),
              result.get("description"),
              result.get("user"),
            ));
          }
        },
        error: function (error) {
          Alert.error('Maßnahmen konnten nicht geladen werden');
        }
      });
    }
  };
}

export function saveMeasure(name, description) {
  return function (dispatch) {
    const Measure = Parse.Object.extend("Measure");
    const measure = new Measure();

    measure.set('name', name);
    measure.set('description', description);
    measure.set('user', Parse.User.current());

    measure.save(null, {
      success: function(measure) {
        dispatch(addMeasure(measure.id, name, description, Parse.User.current()));
        browserHistory.push(`/measure/${measure.id}`);
        Alert.success('Maßnahme erfolgreich angelegt');
      },
      error: function(measure, error) {
        Alert.error('Maßnahme konnten nicht angelegt werden');
      }
    });
  };
}

export function deleteMeasure(id) {
  return function (dispatch) {
    const Measure = Parse.Object.extend("Measure");
    const query = new Parse.Query(Measure);
    query.get(id, {
      success: function(measure) {
        measure.destroy({});
        dispatch({
          type: types.DELETE_MEASURE,
          id: id
        });
        Alert.success('Maßnahme erfolgreich gelöscht');
      },
      error: function(measure, error) {
        Alert.error('Maßnahme konnte nicht gelöscht werden');
      }
    });
  };
}

export function editMeasure(id, name, description) {
  return function (dispatch) {
    const Measure = Parse.Object.extend("Measure");
    const query = new Parse.Query(Measure);

    query.get(id, {
      success: function(measure) {
        measure.set('name', name);
        measure.set('description', description);
        measure.save(null, {
          success: function() {
            dispatch(
              {
                type: types.EDIT_MEASURE,
                name: name,
                description: description,
                id: id
              }
            );
            Alert.success('Maßnahme erfolgreich bearbeitet');
          },
          error: function(error) {
            Alert.error('Maßnahme konnte nicht bearbeitet werden');
          }
        });
      },
      error: function(error) {
        Alert.error('Zu bearbeitende Maßnahme konnte nicht gefunden werden');
      }
    });
  };
}

export function addMeasure(id, name, description, createdBy) {
  return {
    type: types.ADD_MEASURE,
    name, description, id, createdBy
  };
}
