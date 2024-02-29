const express = require('express');
const router = express.Router();
const mockingController = require('../../../controllers/mockingController');

router.get('/mockingproducts', mockingController.getMockingProducts);

module.exports = router;
