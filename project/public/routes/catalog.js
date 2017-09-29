var express = require('express');
var router = express.Router();

// Require controller modules
var adminController = require('../../Controller/AdministratorController');

/// BOOK ROUTES ///

/* GET catalog home page. */
//router.get('/', book_controller.index);

/* POST request for creating Book. */
router.post('/desktop/create', adminController.postDesktop);
router.get('/addItem',);
module.exports = router;