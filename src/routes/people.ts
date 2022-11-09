const validateDocument = require('../middleware/complianceHandler');
const controller = require('../controllers/people');
const router = require('express').Router();

router.post('/', validateDocument, controller.createOne);

module.exports = router;
