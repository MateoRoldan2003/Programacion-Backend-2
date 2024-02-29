const express = require('express');
const router = express.Router();
const cartsController = require('../../../controllers/cartsController');

router.post('/purchase/:cid', cartsController.purchaseCart);

module.exports = router;