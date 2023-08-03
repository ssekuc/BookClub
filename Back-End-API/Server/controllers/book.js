"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
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
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const ext = path_1.default.extname(file.originalname);
        cb(null, Date.now() + ext);
    },
});
exports.upload = (0, multer_1.default)({ storage: storage, fileFilter(req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only images are allowed'));
        }
    }, }).single('cover');
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
        if (req.file) {
            book.cover = req.file.path;
        }
        const newbook = await books_1.default.create(book);
        res.status(201).json(newbook);
    }
    catch (err) {
        res.status(400).json({ message: err });
    }
}
async function getBook(req, res, next) {
    let book;
    try {
        book = await books_1.default.findById(req.params.id);
        if (book == null) {
            return res.status(404).json({ message: 'Can not find book' });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err });
    }
    res.book = book;
    next();
}
async function updateBook(req, res) {
    if (req.body.Name != null) {
        res.book.Name = req.body.Name;
        try {
            const updateBook = await res.book.save();
            res.json(updateBook);
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }
}
async function deleteBook(req, res) {
    let id = req.params.id;
    try {
        await res.book.deleteOne({ id });
        res.json({ message: 'book deleted' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
}
module.exports = { bookList, createBook, upload: exports.upload, getBook, updateBook, deleteBook };
//# sourceMappingURL=book.js.map