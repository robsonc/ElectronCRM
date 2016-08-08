var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    name: String,
    belongsTo: {type: Schema.Types.ObjectId, ref: 'DoList'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Todo', todoSchema);