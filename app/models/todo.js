var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    name: String,
    startDate: Date,
    startTime: Date,
    priority: { type: Number },
    isDone: { type: Boolean, default: false },
    belongsTo: { type: Schema.Types.ObjectId, ref: 'DoList' }
}, {
    timestamps: true
});

todoSchema.methods.do = function () {
    this.isDone = true;
};

todoSchema.methods.undo = function () {
    this.isDone = false;
};

todoSchema.pre('save', function (next) {
    var self = this;

    if (self.priority === undefined) {

        self.model('Todo').find({ belongsTo: self.belongsTo }, '_id priority')
            .sort({ priority: -1 })
            .limit(1)
            .exec(function (err, max) {
                if (err) return next(err);

                if (max.length > 0) {
                    self.priority = max[0].priority + 1;
                } else {
                    self.priority = 0;
                }

                next();
            });

    } else {
        next();
    }

});

module.exports = mongoose.model('Todo', todoSchema);