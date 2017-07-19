var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salesLineItemSchema = new Schema({
    description: String,
    unitPrice: Number,
    quantity: Number    
}, {
    timestamps: true
});

salesLineItemSchema.virtual('subtotal').get(function(){
    return this.unitPrice * this.quantity;
});

module.exports = mongoose.model('SalesLineItem', salesLineItemSchema);