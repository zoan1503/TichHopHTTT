var express = require('express');
var router = express.Router();
var signUpController = require('./../controllers/signUpController');

router.post('/add', signUpController.add);


module.exports = router;