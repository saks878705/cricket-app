const express = require('express');
const router = express.Router();
const MatchController = require('../controller/userController');

router.get('/list', MatchController.listMatches);
router.post('/create', MatchController.createMatch);

module.exports = router;