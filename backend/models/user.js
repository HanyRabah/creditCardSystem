let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var User = new Schema({
    name: {
        type: String,
        required : [ true, 'name is required'],
    },
    cardNumber: {
        type: Number,
        required : [ true, 'card number is required'],
        unique : true,
    },
    limit: {
        type: Number,
        required : [ true, 'limit is required'],
    },
    balance: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);