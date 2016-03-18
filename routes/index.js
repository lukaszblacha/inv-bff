var express = require('express');
var router = express.Router();
var request = require('good-guy-http')({maxRetries: 3});
var jp = require('jsonpath');

var url = 'https://book-catalog-proxy-5.herokuapp.com/book?isbn=';

/* GET home page. */
router.get('/:isbn', function(req, res, next) {
  request(url + req.params.isbn).then(function(response) {
    var b = JSON.parse(response.body);

    console.log(JSON.stringify(b, null, 4));
    res.render('index', {
      title: jp.value(b, '$..title'),
      thumbnail: jp.value(b, '$..thumbnail'),
      isbn: req.params.isbn
    });
  });
});

module.exports = router;
