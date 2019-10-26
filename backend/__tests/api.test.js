const mongoose = require('mongoose');
const { getCards, createCard } = require('../services/cards/card');

const apiUrl = 'http://localhost:3000/api/v1/cards/';

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
        const getCardsData = await fetch(apiUrl);
    });

    
})