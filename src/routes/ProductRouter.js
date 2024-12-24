const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require('../middleware/authMiddleWare')

router.post('/create', ProductController.createProduct);
router.put('/update/:id', authMiddleWare, ProductController.updateProduct);
router.get('/get-details/:id', ProductController.getProductDetails);
router.delete('/delete/:id', ProductController.deleteProduct);
router.get('/getAllProducts', ProductController.getAllProducts);

module.exports = router