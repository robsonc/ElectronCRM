var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
    code: String,
    description: String,
    costPrice: Number,
    sellPrice: Number
});

module.exports = mongoose.model('Product', product);