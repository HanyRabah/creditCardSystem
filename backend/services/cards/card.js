const express = require('express');
const User = require('../../models/user');

const getCards = async (req, res, next) => {
    try {

        let users = await User.find({});

        if (users.length > 0) {
            return res.status(200).json({
                'message': 'users fetched successfully',
                'data': users
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No users found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, Please try again'
        });
    }
}

const createCard = async (req, res, next) => {
    try {

        const {
            name,
            cardNumber,
            limit,
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (cardNumber === undefined || cardNumber === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Card number is required',
                'field': 'cardNumber'
            });
        }

        console.log("TCL: createCard -> valid_credit_card(cardNumber)", valid_credit_card(cardNumber))
        if (!valid_credit_card(cardNumber)) {
            return res.status(422).json({
                'code': 'UNVALID_INPUT',
                'description': 'Unvalid card number',
                'field': 'cardNumber'
            });
        }


        let isCardNumberExists = await User.findOne({
            "cardNumber": cardNumber
        });

        if (isCardNumberExists) {
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'Card Number already exists',
                'field': 'cardNumber'
            });
        }

        const temp = {
            name: name,
            cardNumber: cardNumber,
            limit: limit
        }
        console.log("TCL: createUser -> temp", temp)

        let newUser = await User.create(temp);

        if (newUser) {
            return res.status(201).json({
                'message': 'user created successfully',
                'data': newUser
            });
        } else {
            throw new Error('something went worng');
        }
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong while creating user, Please try again' + error
        });
    }
}

function valid_credit_card(value) {
    // Accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(value)) return false;

    // Luhn 10 Algorithm.
    let nCheck = 0, bEven = false;
    value = value.replace(/\D/g, "");

    for (var n = value.length - 1; n >= 0; n--) {
        var cDigit = value.charAt(n),
            nDigit = parseInt(cDigit, 10);

        if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

        nCheck += nDigit;
        bEven = !bEven;
    }

    return (nCheck % 10) == 0;
}

module.exports = {
    getCards: getCards,
    createCard: createCard,
}