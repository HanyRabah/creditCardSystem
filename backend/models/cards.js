let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Card = new Schema({
    name: {
        type: String,
        required : [ true, 'Name is required'],
    },
    cardNumber: {
        type: Number,
        required : [ true, 'Card number is required'],
        unique : true,
    },
    cardLimit: {
        type: Number,
        required : [ true, 'Card limit is required'],
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Card', Card);