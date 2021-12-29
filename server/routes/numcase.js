var express = require('express');
var router = express.Router();
var numcaseController = require('./../controllers/numcaseController');

router.get('/gethanoi', numcaseController.gethanoi);
router.get('/getvinhphuc', numcaseController.getvinhphuc);


module.exports = router;