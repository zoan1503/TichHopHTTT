var express = require('express');
var router = express.Router();
var signInController = require('./../controllers/signInController');


router.get('/getallreviewbook', signInController.get_all_review_book);
router.get('/getallratingbook', signInController.get_all_rating_book);
router.get('/getallreaction', signInController.get_all_reaction);
router.get('/getalluserinfo', signInController.get_all_user_info);
router.get('/checksignin', signInController.check_signin);
router.put('/updateinfo', signInController.update_info);
router.put('/updatepass', signInController.update_pass);
module.exports = router;