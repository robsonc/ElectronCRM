var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var organizationSchema = new Schema({
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Organization', organizationSchema);