import * as types from '../constants/actionTypes';
import { Parse } from 'parse';

export function loadMeasures() {
  return function (dispatch) {
    const Measure = Parse.Object.extend("Measure");
    const query = new Parse.Query(Measure);

    query.find({
      success: function (results) {
        for (let i = 0; i < results.length; i++) {
          const result = results[i];
          dispatch(addMeasure(
            result.get("name"),
            result.get("description"),
            result.get("objectId")
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

    measure.save(null, {
      success: function(measure) {
        dispatch(addMeasure(name, description, measure.get("id")));
      },
      error: function(measure, error) {
        console.log(error);
      }
    });
  };
}

export function addMeasure(name, description, id) {
  return {
    type: types.ADD_MEASURE,
    name: name,
    description: description,
    id: id
  };
}
