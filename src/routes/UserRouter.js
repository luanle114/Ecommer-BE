const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authMiddleWare, authUserMiddleWare } = require('../middleware/authMiddleWare');

router.post('/sign-up', UserController.createUser);
router.post('/sign-in', UserController.loginUser);
router.put('/update-user/:id', UserController.updateUser);
router.delete('/delete-user/:id', authMiddleWare, UserController.deleteUser);
router.get('/getAllUsers', authMiddleWare, UserController.getAllUsers);
router.get('/get-user/:id', authUserMiddleWare, UserController.getUser);
router.get('/refresh-token', UserController.refreshToken);

module.exports = router