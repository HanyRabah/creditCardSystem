const express = require('express');
const cardService = require('../../services/cards/card');
let router = express.Router();

router.get('/', cardService.getCards);

router.post('/', cardService.createCard);

module.exports = router;