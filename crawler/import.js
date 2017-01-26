const Parse = require('parse/node');
const fs = require('fs');
const path = require('path');


// Set up a connection to the parse server
Parse.initialize('SecMaus');
Parse.serverURL = 'https://api.umfrage.sidate.org/parse';
Parse.clientKey = 'CLIENT_KEY';
  const CatalogMeasure = Parse.Object.extend("CatalogMeasure");

function importCatalogMeasure(name, description, category) {
  const measure = new CatalogMeasure();

  measure.set('name', name);
  measure.set('description', description);
  measure.set('category', category);

  measure.save(null, {
    success: function(measure) {
      console.log('Maßnahme erfolgreich angelegt');
    },
    error: function(measure, error) {
      console.error('Maßnahme konnten nicht angelegt werden: ' + error);
    }
  });
}

if (process.argv.length != 3) {
  console.log("Usage: node import.js FILE.json");
} else {

  const file = process.argv[2];
  const obj = JSON.parse(fs.readFileSync(file, 'utf8'));

  const category = path.basename(file, ".json");

  obj.forEach(function(measure) {
    importCatalogMeasure(measure.title, measure.content, category);
  });
}
