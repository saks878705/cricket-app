const express = require('express');
const router = express.Router();
const NotificationController = require('../controller/userController');

router.post('/add', NotificationController.addNotification);
router.get('/list', NotificationController.listNotifications);

module.exports = router;