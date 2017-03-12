var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/hodac_demo';
var db = pgp(connectionString);

function getAllWards(req, res, next) {
  db.any('select * from crime_stats')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Wards'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getSingleWard(req, res, next) {
  var wardID = parseInt(req.params.id);
  db.one('select * from uk_wards where gid = $1', wardID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE ward'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getQueryResults(req, res, next) {

  // -------------- Code to create a where clause for a SQL SELECT Statement

  var fieldList = {'Place Name':'string', 
        'category':'string',
        'location_type':'string',
        'longitude':'real',
        'latitude':'real',
        'street-name':'string', 
        'street-id':'integer', 
        'location_subtype':'string', 
        'outcome-category':'string', 
        'outcome-date':'date',
        'persistent_id':'string', 
        'month':'date', 
        'context':'string', 
        'id':'integer'};

  var whereClause = '';
  var whereValue;
  var symbol;
  var dataType;
  var typePrefix = '';

  for (field in fieldList){
    
    whereValue = req['query'][field];
    dataType = fieldList[field];
    
    switch (dataType)
    {
      case 'string':
        symbol = "'";
        typePrefix = '';
        break;
      case 'date':
        symbol = "'";
        typePrefix = ' date ';
        break;
      default:
       symbol = '';
       typePrefix = '';
    }

    if (whereClause != '' && !(typeof whereValue === 'undefined')){ //'undefined')){
      whereClause += ' AND ';
    };

    if (!(typeof whereValue === 'undefined')){
      whereClause += '"' + field + '" = ' + typePrefix + symbol + decodeURIComponent(whereValue) + symbol;
    };
  }

  if (whereClause != '') {
    whereClause = ' WHERE ' + whereClause
  };

  // // ----------------- end of Where Clause statement generation

  console.log('Query String: select * from crime_stats' + whereClause);
  // res = 'select * from crime_stats' + whereClause;
  db.any('select * from crime_stats' + whereClause)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ALL Wards'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}



module.exports = {
  getAllWards: getAllWards,
  getSingleWard: getSingleWard,
  getQueryResults: getQueryResults 
};
