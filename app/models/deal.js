var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dealSchema = new Schema({
    title: String,
    value: Number,
    person: {type: Schema.Types.ObjectId, ref: 'Person'},
    organization: {type: Schema.Types.ObjectId, ref: 'Organization'},
    stage: {type: Schema.Types.ObjectId, ref: 'Stage'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Deal', dealSchema);