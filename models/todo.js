var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);