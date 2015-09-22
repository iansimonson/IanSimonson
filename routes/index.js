var express = require('express');
var router = express.Router();

var PostModel = require('../models/Post.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  PostModel.find({},null,{sort: {created_at: -1},limit: 1},function(error,posts){
      if(error) {
        console.error(error);
      } else {
        res.render('index',{
          title: 'Ian Simonson',
          articles: posts
        });
      }
    });
  });

router.get('/contact',function(req, res, next){
  res.render('contact', { title: 'Contact' });
});

module.exports = router;
