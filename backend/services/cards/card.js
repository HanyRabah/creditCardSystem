const express = require('express');
const Card = require('../../models/cards');

const getCards = async (req, res, next) => {
    try {

        let cards = await Card.find({});

        if (cards.length > 0) {
            return res.status(200).json({
                'message': 'Cards fetched successfully',
                'data': cards
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No Cards found in the system'
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
            cardLimit,
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Name Field is required',
                'field': 'name'
            });
        }

        if (cardNumber === undefined || cardNumber === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Card Number is required',
                'field': 'cardNumber'
            });
        }

        let isCardNumberExists = await Card.findOne({
            "cardNumber": cardNumber
        });

        if (isCardNumberExists) {
            return res.status(409).json({
                'code': 'ENTITY_ALREAY_EXISTS',
                'description': 'Card Number already exists',
                'field': 'cardNumber'
            });
        }        

        if (!LuhanCheck(cardNumber)) {
            return res.status(422).json({
                'code': 'UNVALID_INPUT',
                'description': 'Unvalid Card number',
                'field': 'cardNumber'
            });
        }

        if (cardLimit === undefined || cardLimit === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'Limit Field is required',
                'field': 'cardLimit'
            });
        }

        const temp = {
            name: name,
            cardNumber: cardNumber,
            cardLimit: cardLimit
        }

        let newCard = await Card.create(temp);

        if (newCard) {
            return res.status(201).json({
                'message': 'card created successfully',
                'data': newCard
            });
        } else {
            throw new Error('something went wrong');
        }
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong while creating card, Please try again' + error
        });
    }
}

const LuhanCheck = num => {
    let Arr = (num + '').split('').reverse().map(n => parseInt(n));
    let lastChar = Arr.splice(0, 1)[0];
    let total = Arr.reduce((acc, val, i) => (i % 2 !== 0 ? acc + val : acc + ((val * 2) % 9) || 9), 0);
    total += lastChar;
    return total % 10 === 0;
}

module.exports = {
    getCards: getCards,
    createCard: createCard,
}