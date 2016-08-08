var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var doListSchema = new Schema({
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('DoList', doListSchema);