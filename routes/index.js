var express = require('express');
var request = require('request');
var router = express.Router();

var url = 'https://book-catalog-proxy-4.herokuapp.com/book?isbn=';

/* GET home page. */
router.get('/:isbn', function(req, res, next) {
  request.get(url + req.params.isbn, function(error, response, body) {
    var b = JSON.parse(body).items[0];
    console.log(JSON.stringify(b, null, 4));
      res.render('index', {
        title: b.volumeInfo.title,
        thumbnail: b.volumeInfo.imageLinks.thumbnail
      });
  });
});

module.exports = router;
