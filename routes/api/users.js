const express = require('express');
const router = express.Router();
const usersController = require('../../../controllers/usersController');

router.put('/premium/:uid', usersController.changeUserRole);

module.exports = router;