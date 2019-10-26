const cardController = require('../../controllers/apis/card');

const express = require('express');
let router = express.Router();
router.use('/cards', cardController);
module.exports = router;