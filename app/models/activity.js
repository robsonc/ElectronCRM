var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    content: String,
    startDate: Date,
    startTime: Date,
    deal: {type: Schema.Types.ObjectId, ref: 'Deal'}
}, {
    timestamps: true
});

module.exports = mongoose.model('Activity', activitySchema);