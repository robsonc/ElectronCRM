var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var product = new Schema({
    code: String,
    description: String,
    costPrice: Number,
    sellPrice: Number
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Product', product);