var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var todoSchema = new Schema({
    name: String,
    priority: { type: Number },
    belongsTo: { type: Schema.Types.ObjectId, ref: 'DoList' }
}, {
        timestamps: true
    });

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