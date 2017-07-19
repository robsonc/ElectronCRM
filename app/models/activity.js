var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = new Schema({
    content: String,
    startDate: Date,
    startTime: Date,
    isDone: {type: Boolean, default: false},
    deal: {type: Schema.Types.ObjectId, ref: 'Deal'}
}, {
    timestamps: true
});

activitySchema.methods.do = function () {
    this.isDone = true;
};

activitySchema.methods.undo = function () {
    this.isDone = false;
};

module.exports = mongoose.model('Activity', activitySchema);