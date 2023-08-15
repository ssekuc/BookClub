"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home' });
}
router.get('/cartpage', function (req, res, next) {
    // Adjust the path to match your directory structure
    console.log("Cart Page Prints");
    res.render('index', { title: 'Cart', page: 'cartpage' });
    // res.sendFile(path.join(__dirname, '../my-react-app/public/index.html'));
});
/* GET home page. */
router.get('/', DisplayHomePage);
router.get('/home', DisplayHomePage);
router.get('/index', DisplayHomePage);
exports.default = router;
