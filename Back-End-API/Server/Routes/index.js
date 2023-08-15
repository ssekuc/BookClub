"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bookController = require('../controllers/book');
const utils_1 = require("../utils");
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home', displayName: (0, utils_1.UserDisplayName)(req) });
}
router.get('/cart', (req, res, next) => {
    console.log("Cart Page Prints");
    res.render('index', { title: 'Cart', page: 'cart', displayName: (0, utils_1.UserDisplayName)(req) });
});
router.get('/', DisplayHomePage);
router.get('/home', DisplayHomePage);
router.get('/index', DisplayHomePage);
module.exports = router;
exports.default = router;
//# sourceMappingURL=index.js.map