var express = require('express');
var router = express.Router();
var News = require('../model/news');

var request = require("request");
var cheerio = require("cheerio");


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


function parse() {
  request({
    uri: "https://ain.ua/",
  }, function (error, response, body) {
    var $ = cheerio.load(body);

    $(".new_post_item h2").each(function () {
      var link = $(this);
      var text = link.text();

      News.findOne({title:text}).exec(function (err, news) {
        if (!news) {
          var newItem = new News({
            title: text
          });
          newItem.save();
        }  
      });

      console.log(text);
    });
  });
}


router.get('/parseNews', function (req, res, next) {
  parse();

  
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