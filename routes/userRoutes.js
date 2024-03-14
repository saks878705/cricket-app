const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/profile', UserController.getProfile);
router.put('/edit-profile', UserController.editProfile);
router.post('/add-money', UserController.addMoneyToWallet);
router.get('/wallet-history', UserController.walletTransactionHistory);

module.exports = router;