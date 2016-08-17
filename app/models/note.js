var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var noteSchema = new Schema({
    content: String,
    deal: {type: Schema.Types.ObjectId, ref: 'Deal'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Note', noteSchema);