var express = require('express');
var router = express.Router();
var request = require('good-guy-http')({maxRetries: 3});
var jp = require('jsonpath');

var booksServiceUrl = process.env.URL_BOOKS_SERVICE || 'https://book-catalog-proxy-3.herokuapp.com';
var inventoryServiceUrl = process.env.URL_INVENTORY_SERVICE || 'http://localhost:3000';

/* GET home page. */
router.get('/:isbn', function(req, res, next) {
  request(booksServiceUrl + '/book?isbn=' + req.params.isbn).then(function(response) {
    var b = JSON.parse(response.body);

    res.render('index', {
      title: jp.value(b, '$..title'),
      thumbnail: jp.value(b, '$..thumbnail'),
      isbn: req.params.isbn,
      availabilityCheckUrl: inventoryServiceUrl + '/stock/' + req.params.isbn
    });
  });
});

module.exports = router;
