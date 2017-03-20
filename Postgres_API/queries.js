var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/hodac_demo';
var db = pgp(connectionString);

function getAllWards(req, res, next) {
  db.any('select * from uk_wards')
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
  console.log('Getting one ward - id:', wardID);
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
  var whereValue, whereItem, i, iLen;
  var symbol;
  var dataType, timeStamp;
  var typePrefix = '';
  var qryValue;

  console.log(req['query']);

  for (field in fieldList){
    
    whereValue = req['query'][field];
    dataType = fieldList[field];

    // console.log("whereValue:",whereValue);
    // console.log("dataType:", dataType);
    
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


    if (typeof whereValue != 'undefined') {
      if (whereClause != ''){ //'undefined')){
        // whereClause += ' AND ';
        whereClause += ' AND ';
      };
      
        whereClause += '"' + field + '" IN ' + '(';
      
      // console.log("field:", field);
      if (typeof whereValue === 'object') {
        // console.log("Length of Date Obj:", whereValue.length);
        for (i=0, iLen = whereValue.length; i < iLen; i++) { //  whereItem in whereValue) {
          // console.log("date " + i + ":", whereValue[i]);
          if (!(typeof whereValue[i] === 'undefined')) {
            // whereClause += '"' + field + '" IN ' + '(' + typePrefix + symbol;
            // whereClause += field + ' = ' + typePrefix + symbol;
            whereClause += typePrefix + symbol;
            qryValue = decodeURIComponent(whereValue[i]);
            if (dataType === 'date') {
               qryValue = qryValue.replace(/\\/g,'-').replace(/\//g,'-');
            };
            whereClause += qryValue + symbol;
            if (i === iLen - 1) {
               whereClause += ')';
            } else {
              whereClause += ',';
            };
          };
          //whereClause = whereClause.slice(0,whereClause.length - 1) + ')';
        }
      } else {
        // if (!(typeof whereValue === 'undefined')){
          // whereClause += '"' + field + '" IN ' + '(' + typePrefix + symbol;
          // whereClause += field + ' = ' + typePrefix + symbol;
          whereClause += typePrefix + symbol;
          qryValue = decodeURIComponent(whereValue);
          if (dataType === 'date') {
             qryValue = qryValue.replace(/\\/g,'-').replace(/\//g,'-');
          };
          whereClause += qryValue + symbol + ')';
        // };
      };

    };
  }

  if (whereClause != '') {
    whereClause = ' WHERE ' + whereClause
  };

  // // ----------------- end of Where Clause statement generation

  timeStamp = new Date();
  console.log('TimeStamp:', timeStamp.toUTCString());
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
