const verifyToken = require('../middleware/AuthenticationHandler');
const cards = require('../controllers/cards');
const router = require('express').Router();
const { paginatedResult } = require('../middleware/PaginationHandler');

router.get('/', verifyToken, cards.getPeopleCards, paginatedResult);

module.exports = router;
