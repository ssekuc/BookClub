"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_1 = require("../controllers/book");
const router = express_1.default.Router();
const bookController = require('../controllers/book');
router.get('/books/list', bookController.bookList);
router.post('/books/create', book_1.upload, bookController.createBook);
router.get('/api/getbook/:id', bookController.getBook, (req, res) => {
    res.json(res.book);
});
router.patch('/api/updatebook/:id', bookController.getBook, bookController.updateBook);
router.delete('/api/deletebook/:id', bookController.getGame, bookController.deleteBook);
module.exports = router;
exports.default = router;
//# sourceMappingURL=books.js.map