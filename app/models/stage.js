var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var stageSchema = new Schema({
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Stage', stageSchema);