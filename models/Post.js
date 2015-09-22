var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
  title: {type: String, required: true},
  full_text: {type: String, required: true},
  small_text: {type: String, required: true},
  // comments: [Comment],
  created_at: {type: Date, default: Date.now},
  modified: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Post', Post,'posts');