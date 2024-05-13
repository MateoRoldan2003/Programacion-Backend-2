const express = require('express');
const router = express.Router();
const cartsController = require('../../../controllers/cartsController');

router.get('/', cartsController.getUserCart);

router.post('/', cartsController.addToCart);

router.put('/:productId', cartsController.updateCartItem);

router.delete('/:productId', cartsController.removeFromCart);

router.post('/purchase', cartsController.purchaseCart);

module.exports = router;