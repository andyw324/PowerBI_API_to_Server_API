var express = require('express');
var router = express.Router();

var db = require('../queries');

router.get('/api/wards', db.getAllWards);
router.get('/api/wards/:id', db.getSingleWard);
router.get('/api/crime_stats', db.getQueryResults);

module.exports = router;