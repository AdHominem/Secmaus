import * as types from '../constants/actionTypes';
import { Parse } from 'parse';
import Alert from 'react-s-alert';

export function loadMeasures() {
  return (dispatch, getState) => {
    const CatalogMeasure = Parse.Object.extend("CatalogMeasure");
    const query = new Parse.Query(CatalogMeasure);
    const { catalogReducer } = getState();

    const chunk_size = 200;
    const chunk_count = 10;

    // Don't load the description of the measures here,
    // because amount of data would be to high
    // query.ascending("name").select("id", "name", "category");
    query.select("id", "name", "category");
    
    const loadChunk = (i, max) => {
      if (i < max) {
        console.log("Loading chunk " + (i + 1) + " of " + max);
        query.skip(chunk_size * i).limit(chunk_size);
        query.find({
          success: measures => {
            dispatch({
              type: types.ADD_CATALOG_MEASURES,
              measures: measures.map( m => ({id: m.id, name: m.get("name"), category: m.get("category")}))
            });
            loadChunk(i + 1, max);
          },
          error: error => Alert.error('Maßnahmenkatalog konnte nicht geladen werden: ' + error)
        });
      }
    };

    if (!catalogReducer.loaded) {
      loadChunk(0, chunk_count);
    }
  };
}
