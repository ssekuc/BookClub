"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const books_1 = __importDefault(require("../models/books"));
async function bookList(req, res) {
    try {
        const book = await books_1.default.find();
        res.json(book);
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}
async function createBook(req, res) {
    const book = new books_1.default({
        Name: req.body.Name,
        Author: req.body.Author,
        Sipnosis: req.body.Sipnosis,
        Year: req.body.Year,
        TotalPages: req.body.TotalPages,
        Edition: req.body.Edition,
        Publisher: req.body.Publisher,
    });
    try {
        const newbook = await book.save();
        res.status(201).json(newbook);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}
module.exports = { bookList, createBook };
//# sourceMappingURL=book.js.map