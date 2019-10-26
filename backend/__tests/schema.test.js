const mongoose = require('mongoose');
const CardModel = require('../models/cards');
const cardData = { name: 'John', cardNumber: 4242424242424242, limit: 1000};

describe('Card Model Test', () => {

    beforeAll(async () => {
        await mongoose.connect(global.__MONGO_URI__, { 
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
         }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
        });
    });

    afterAll(async () => {
        await connection.close();
        await db.close();
    });

    it('create & save card successfully', async () => {
        const validCard = new CardModel(cardData);
        const savedCard = await validCard.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedCard._id).toBeDefined();
        expect(savedCard.name).toBe(cardData.name);
        expect(savedCard.cardNumber).toBe(cardData.cardNumber);
        expect(savedCard.limit).toBe(cardData.limit);
        expect(savedCard.balance).toBe(0);
    });

    it('insert card successfully, if field does not defined in schema should be undefined', async () => {
        const cardWithInvalidField = new CardModel({ name: 'John', cardNumber: 4242424252525252, limit: 1000 });
        const savedCardWithInvalidField = await cardWithInvalidField.save();
        expect(savedCardWithInvalidField._id).toBeDefined();
        expect(savedCardWithInvalidField.cardNumber).toBeDefined();
        expect(savedCardWithInvalidField.extra).toBeUndefined();
    });

    it('create card without required field should fail', async () => {
        const cardWithoutRequiredField = new CardModel({ name: 'John' });
        let err;
        try {
            const savedCardWithoutRequiredField = await cardWithoutRequiredField.save();
            error = savedCardWithoutRequiredField;
        } catch (error) {
            err = error
        }
        expect(err).toBeInstanceOf(mongoose.Error.ValidationError)
        expect(err.errors.cardNumber).toBeDefined();
        expect(err.errors.limit).toBeDefined();
    });
    
})