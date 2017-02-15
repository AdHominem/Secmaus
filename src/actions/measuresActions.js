import * as types from '../constants/actionTypes';
import { Parse } from 'parse';
import { browserHistory } from 'react-router';
import Alert from 'react-s-alert';

export function loadMeasures() {
  return (dispatch, getState) => {
    const Measure = Parse.Object.extend("Measure");
    const query = new Parse.Query(Measure).include("user");

    const {measuresReducer} = getState();

    if (!measuresReducer.loaded) {
      query.find({
        success: results => {
          results.forEach(result => {
            dispatch(addMeasure(
              result.id,
              result.get("name"),
              result.get("description"),
              result.get("user"),
            ));
          })
        },
        error: error => {
          Alert.error('Maßnahmen konnten nicht geladen werden: ' + error);
        }
      });
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

    measure.save(null, {
      success: measure => {
        dispatch(addMeasure(measure.id, name, description, Parse.User.current()));
        browserHistory.push(`/SIDATESecMaus/measure/${measure.id}`);
        Alert.success('Maßnahme erfolgreich angelegt');
      },
      error: (measure, error) => {
        Alert.error('Maßnahme konnten nicht angelegt werden: ' + error);
      }
    });
  };
}

export function deleteMeasure(id) {
  return dispatch => {
    const Measure = Parse.Object.extend("Measure");
    const query = new Parse.Query(Measure);
    query.get(id, {
      success: measure => {
        measure.destroy({});
        dispatch({
          type: types.DELETE_MEASURE,
          id: id
        });
        Alert.success('Maßnahme erfolgreich gelöscht');
        browserHistory.push('/SIDATESecMaus/measures');
      },
      error: (measure, error) => {
        Alert.error('Maßnahme konnte nicht gelöscht werden: ' + error);
      }
    });
  };
}

export function editMeasure(id, name, description) {
  return dispatch => {
    const Measure = Parse.Object.extend("Measure");
    const query = new Parse.Query(Measure);

    query.get(id, {
      success: measure => {
        measure.set('name', name);
        measure.set('description', description);
        measure.save(null, {
          success: () => {
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
          error: error => {
            Alert.error('Maßnahme konnte nicht bearbeitet werden: ' + error);
          }
        });
      },
      error: error => {
        Alert.error('Zu bearbeitende Maßnahme konnte nicht gefunden werden: ' + error);
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

export function addMeasureFromCatalog(id) {
  return dispatch => {
    const CatalogMeasure = Parse.Object.extend("CatalogMeasure");
    const query = new Parse.Query(CatalogMeasure);

    query.get(id, {
      success: measure => {
        dispatch(saveMeasure(measure.get("name"), measure.get("description")));
      },
      error: error => {
        Alert.error('Zu importierende Maßnahme konnte nicht gefunden werden: ' + error);
      }
    });
  };
}
