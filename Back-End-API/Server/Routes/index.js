"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
function DisplayHomePage(req, res, next) {
    res.render('index', { title: 'Home', page: 'home' });
}
router.get('/', DisplayHomePage);
router.get('/home', DisplayHomePage);
router.get('/index', DisplayHomePage);
module.exports = router;
exports.default = router;
//# sourceMappingURL=index.js.map