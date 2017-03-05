import * as types from '../constants/actionTypes';
import { Parse } from 'parse';
import Alert from 'react-s-alert';

export function loadMeasures() {
  return (dispatch, getState) => {
    const CatalogMeasure = Parse.Object.extend("CatalogMeasure");
    const query = new Parse.Query(CatalogMeasure);

    const chunk_size = 200;
    const chunk_count = 10;

    // Don't load the description of the measures here,
    // because amount of data would be to high
    // query.ascending("name").select("id", "name", "category");
    query.select("id", "name", "category");

    const loadChunk = (i, max) => {
      if (i < max) {
        query.skip(chunk_size * i).limit(chunk_size);
        query.find().then(
          measures => {
            dispatch({
              type: types.ADD_CATALOG_MEASURES,
              measures: measures.map( m => ({id: m.id, name: m.get("name"), category: m.get("category")}))
            });
            loadChunk(i + 1, max);
          }
        ).catch(
          () => Alert.error('Maßnahmenkatalog konnte nicht geladen werden')
        );
      }
    };

    const { catalog } = getState();
    if (catalog.length == 0) {
      loadChunk(0, chunk_count);
    }
  };
}
