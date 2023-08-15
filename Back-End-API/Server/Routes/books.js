"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var book_1 = require("../controllers/book");
var router = express.Router();
var bookController = require('../controllers/book');
// GET BOOK LIST
router.get('/api/books', bookController.getAllBooks);
//CREATE A NEW BOOK
router.post('/api/books/create', book_1.upload, bookController.createBook);
//MILDWARE 
router.get('/api/book/:id', bookController.getBookById, function (req, res) {
    res.json(res.book);
});
//UPDATE BOOK 
router.patch('/api/book/update/:id', bookController.getBookById, bookController.updateBook);
//DELETE BOOK 
router.delete('/api/book/delete/:id', bookController.getBookById, bookController.deleteBook);
exports.default = router;
