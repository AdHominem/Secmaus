import * as types from '../constants/actionTypes';
import { Parse } from 'parse';
import { browserHistory } from 'react-router';

export function loadMeasures() {
  return function (dispatch) {
    const Measure = Parse.Object.extend("Measure");
    const query = new Parse.Query(Measure).include("user");

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
        console.log(error);
      }
    });
  };
}

export function saveMeasure(name, description) {
  return function (dispatch) {
    const Measure = Parse.Object.extend("Measure");
    const measure = new Measure();

    measure.set('name', name);
    measure.set('description', description);
    measure.set('user', Parse.User.current());

    console.dir(Parse.User.current());

    measure.save(null, {
      success: function(measure) {
        dispatch(addMeasure(measure.id, name, description, Parse.User.current()));
        browserHistory.push(`/measure/${measure.id}`);
      },
      error: function(measure, error) {
        console.log(error);
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
      },
      error: function(measure, error) {
        console.log(error);
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
          },
          error: function(error) {
            console.log(error);
          }
        });
      },
      error: function(error) {
        console.log(error);
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
