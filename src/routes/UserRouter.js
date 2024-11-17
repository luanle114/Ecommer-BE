const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { AuthMiddleWare, AuthUserMiddleWare } = require('../middleware/authMiddleWare');

router.post('/sign-up', UserController.createUser);
router.post('/sign-in', UserController.loginUser);
router.put('/update-user/:id', UserController.updateUser);
router.delete('/delete-user/:id', AuthMiddleWare, UserController.deleteUser);
router.get('/getAllUsers', AuthMiddleWare, UserController.getAllUsers);
router.get('/get-user/:id', AuthUserMiddleWare, UserController.getUser);
router.get('/refresh-token', UserController.refreshToken);

module.exports = router