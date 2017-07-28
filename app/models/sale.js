var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var payment = new Schema({
    value: Number,
    type: Number
});

var salesLineItem = new Schema({
    code: String,
    description: String,
    unitPrice: Number,
    quantity: Number,
    discountPercentage: {
        type: Number,
        default: 0
    }   
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//procedures
salesLineItem.methods.aplicaDescontoPercentual = function(percentual) {
    this.discountPercentage = percentual;
};

salesLineItem.methods.mudaQuantidade = function(newQuantity) {
    this.quantity = newQuantity;
};

salesLineItem.methods.mudaPrecoVenda = function(newSellPrice) {
    this.unitPrice = newSellPrice;
};

//virtuals
salesLineItem.virtual('subtotal').get(function(){
    return this.unitPrice * this.quantity;
});

salesLineItem.virtual('discount').get(function(){
    return this.subtotal * (this.discountPercentage / 100);
});

salesLineItem.virtual('total').get(function(){
    return this.subtotal - this.discount;
});

var sale = new Schema({
    identifier: String,
    balance: Number,
    total: Number,
    subtotal: Number,
    discount: Number,
    amountPaid: Number,
    change: Number,
    lineItems: [salesLineItem],
    payments: [payment]
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

//procedures
sale.methods.aplicaDescontoPercentualItem = function(itemId, percentual){
    var lineItem = this.lineItems.id(itemId);
    lineItem.aplicaDescontoPercentual(percentual);
};

sale.methods.mudaQuantidadeItem = function(itemId, newQuantity) {
    var lineItem = this.lineItems.id(itemId);
    lineItem.mudaQuantidade(newQuantity);
};

sale.methods.mudaPrecoVendaItem = function(itemId, newSellPrice) {
    var lineItem = this.lineItems.id(itemId);
    lineItem.mudaPrecoVenda(newSellPrice);
};

//virtuals
sale.methods.getSubtotal = function(){
    var total = 0;

    this.lineItems.forEach(function(item){
        total += item.subtotal;
    });

    return total;
};

sale.methods.getDiscount = function(){
    var total = 0;

    this.lineItems.forEach(function(item){
        total += item.discount;
    });

    return total;
};

sale.methods.getTotal = function(){
    var total = 0;

    this.lineItems.forEach(function(item){
        total += item.total;
    });

    return total;
};

sale.methods.getAmountPaid = function(){
    var total = 0;

    this.payments.forEach(function(payment){
        total += payment.value;
    });

    return total;
};

sale.methods.getBalance = function(){
    var total = 0;

    total = this.total - this.amountPaid;

    return total;
};

sale.methods.getChange = function(){
    var total = 0;

    if (this.balance < 0) {
        total = -this.balance;
    }

    return total;
};

sale.pre('save', function(next){
    this.discount = this.getDiscount();
    this.amountPaid = this.getAmountPaid();
    this.subtotal = this.getSubtotal();
    this.total = this.getTotal();
    this.balance = this.getBalance();
    this.change = this.getChange();
    next();
});

module.exports = mongoose.model('Sale', sale);