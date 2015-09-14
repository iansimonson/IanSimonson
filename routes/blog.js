var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var configDB = require('../config/database.js');



var Comment = new Schema({
  commenter: {type: String, required: true},
  full_text: {type: String, required: true},
  created_at: {type: Date, default: Date.now}
});

var Post = new Schema({
  title: {type: String, required: true},
  full_text: {type: String, required: true},
  comments: [Comment],
  created_at: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});

var PostModel = mongoose.model('Post', Post);


mongoose.connect(configDB.url);

router.get('/', function(req, res, next) {
  PostModel.find(function(error, posts){
    if(error) {
      console.error(error);
    } else {
      res.render('blog',{
        title: 'Blog',
        articles: posts
      });
    }
  });
});

router.get('/new',function(req,res){
  res.render('newPost', { title: 'New Post'});
});

router.post('/new',savePost);
router.post('/',savePost);

router.get('/:id', function(req,res){
  PostModel.findById(req.params.id, function(error, post){
    if(error){
      console.error(error);
    } else {
      res.render('blog_show',{
        title: post.title,
        article: post
      });
    }
  });
});

router.put('/:id', function(req, res){
  PostModel.findById(req.params.id, function(error, post){
    post.title = req.body.title;
    post.full_text = req.body.full_text;
    post.modified = Date.now;
    post.save(function(error){
      if(error) console.error(error)
      else res.redirect('/' + req.params.id);
    });
  });
});

router.delete('/:id', function(req, res){
  PostModel.findById(req.params.id, function(error, post){
    post.remove(function (error){
      if(error) console.error(error);
      else{
        console.log("Removed " + post.title);
        res.redirect('./');
      }
    })
  })
});

function savePost(req, res){
  var post;
  post = new PostModel({
    title: req.body.title,
    full_text: req.body.full_text
  });
  post.save(function(error){
    if(error){
      console.error(error);
    } else {
      res.redirect('./');
    }
  });
};

// router.post('/addComment', function(req,res){
//   articleProvider.addComment(req.body._id,{
//     person: req.body.person,
//     comment: req.body.comment,
//     created_at: new Date()
//   }, function(error, docs){
//     res.redirect('./' + req.body._id);
//   });
// });

module.exports = router;
