"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const bookController = require('../controllers/book');
router.get('/books/list', bookController.bookList);
router.post('/books/create', bookController.createBook);
module.exports = router;
exports.default = router;
//# sourceMappingURL=books.js.map