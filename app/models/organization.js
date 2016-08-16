var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var organizationSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Organization', organizationSchema);