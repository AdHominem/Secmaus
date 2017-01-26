import * as types from '../constants/actionTypes';
import { Parse } from 'parse';
import Alert from 'react-s-alert';

export function loadMeasures() {
  return (dispatch, getState) => {
    const CatalogMeasure = Parse.Object.extend("CatalogMeasure");
    const query = new Parse.Query(CatalogMeasure);
    // Don't load the description of the measures here,
    // because amount of data would be to high

    // The default limit is 100, but there are ~1.4k measures in the catalog
    // TODO: for some reason using `ascending` overwrites the limit w/ 1000
    query.limit(10000).select("id", "name", "category");//.ascending("name");

    const {catalogReducer} = getState();

    if (!catalogReducer.loaded) {
      console.log("Starting catalog query");
      query.find({
        success: results => {
          console.log(results.length);
          for (let i = 0; i < results.length; i++) {
            const result = results[i];
            dispatch({
              type: types.ADD_CATALOG_MEASURE,
              id: result.get("id"),
              name: result.get("name"),
              category: result.get("category")
            });
          }
        },
        error: error => {
          Alert.error('Maßnahmenkatalog konnte nicht geladen werden: ' + error);
        }
      });
    }
  };
}
