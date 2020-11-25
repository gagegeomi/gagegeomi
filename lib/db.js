var low = require('lowdb');
var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('./works.json');
var db = low(adapter);
db.defaults( { works: [] } ).write();

module.exports = db;

