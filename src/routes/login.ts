const controller = require('../controllers/login');
const router = require('express').Router();

router.post('/', controller.login);

module.exports = router;
