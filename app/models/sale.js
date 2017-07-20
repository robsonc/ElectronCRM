var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var salesLineItem = new Schema({
    description: String,
    unitPrice: Number,
    quantity: Number,
    discount: {
        type: Number,
        default: 0
    }   
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

salesLineItem.virtual('subtotal').get(function(){
    return this.unitPrice * this.quantity;
});

salesLineItem.virtual('total').get(function(){
    return this.subtotal - this.discount;
});

var sale = new Schema({
    identifier: String,
    lineItems: [salesLineItem]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

sale.virtual('subtotal').get(function(){
    var total = 0;

    this.lineItems.forEach(function(item){
        total += item.subtotal;
    });

    return total;
});

sale.virtual('discount').get(function(){
    var total = 0;

    this.lineItems.forEach(function(item){
        total += item.discount;
    });

    return total;
});

sale.virtual('total').get(function(){
    var total = 0;

    this.lineItems.forEach(function(item){
        total += item.total;
    });

    return total;
});

module.exports = mongoose.model('Sale', sale);