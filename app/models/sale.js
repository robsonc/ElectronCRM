var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salesLineItemSchema = new Schema({
    description: String,
    unitPrice: Number,
    quantity: Number    
});

salesLineItemSchema.virtual('subtotal').get(function(){
    return this.unitPrice * this.quantity;
});

var saleSchema = new Schema({
    identifier: String,
    date: {
        type: Date,
        default: new Date()
    },
    discount: {
        type: Number,
        default: 0
    },
    lineItems: [salesLineItemSchema]
}, {
    timestamps: true
});

saleSchema.virtual('subtotal').get(function(){
    var total = 0;

    this.lineItems.forEach(function(item){
        total += item.subtotal;
    });

    return total;
});

saleSchema.virtual('total').get(function(){
    return this.subtotal - this.discount;
});

module.exports = mongoose.model('Sale', saleSchema);