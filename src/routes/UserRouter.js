const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/sign-up', UserController.createUser);
router.post('/sign-in', UserController.loginUser);
router.put('/update-user/:id', UserController.updateUser);
router.delete('/delete-user/:id', UserController.deleteUser);

module.exports = router