const express = require('express');
const router = express.Router();
const appController = require('../controllers/app.controller');

router.get('/', appController.get);

router.post('/',appController.create);

router.delete('/:deleteFruitId',appController.remove);


module.exports = router;
