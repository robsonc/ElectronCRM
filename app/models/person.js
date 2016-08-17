var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = new Schema({
    name: String,
    phone: String,
    email: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Person', personSchema);