var express = require('express');
var router = express.Router();
var News = require('../model/news');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

router.get('/parseNews', function (req, res, next) {
  res.render('index', {
    title: 'parse'
  });
});

router.get('/getNews', function (req, res, next) {

  News.find()
    .exec(function (err, news) {
      if (err) {
        return next(err);
      }
      res.send({
        news: news
      });
    });

});

module.exports = router;