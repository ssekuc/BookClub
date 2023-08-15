"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
// import express from "express";
// import mongoose from "mongoose";
var multer = require("multer");
var path = require("path");
var books_1 = require("../models/books");
// GET BOOK LIST
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, query, Year, Author, sort, filter, book, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    _a = req.query, query = _a.query, Year = _a.Year, Author = _a.Author, sort = _a.sort;
                    filter = createFilter(query, Year, Author);
                    return [4 /*yield*/, fetchBooks(filter, sort)];
                case 1:
                    book = _b.sent();
                    // const book = await Books.find()
                    res.json(book);
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _b.sent();
                    res.status(500).json({ message: err_1 });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// BOOK LIST FILTER BY NAME, YEAR AND AUTHOR
var createFilter = function (query, Year, Author) {
    var filter = {};
    if (query) {
        filter.Name = { $regex: query, $options: 'i' };
    }
    if (Year) {
        filter.Year = Number(Year);
    }
    if (Author) {
        filter.Author = { $regex: Author, $options: 'i' };
    }
    return filter;
};
// BOOK LIST FILTER ASC AND DESC
var fetchBooks = function (filter, sort) { return __awaiter(void 0, void 0, void 0, function () {
    var query, book;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                query = books_1.default.find(filter);
                if (sort === 'asc') {
                    query = query.sort({ Name: 1 });
                }
                else if (sort === 'desc') {
                    query = query.sort({ Name: -1 });
                }
                return [4 /*yield*/, query.exec()];
            case 1:
                book = _a.sent();
                return [2 /*return*/, book];
        }
    });
}); };
// Configure Multer for image upload
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Save uploaded files to the "uploads" folder
    },
    filename: function (req, file, cb) {
        var ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Generate a unique filename
    },
});
exports.upload = multer({ storage: storage, fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        }
        else {
            cb(new Error('Only images are allowed'));
        }
    }, }).single('cover');
// CREATE BOOK
function createBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var book, newbook, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    book = new books_1.default({
                        Name: req.body.Name,
                        Author: req.body.Author,
                        Sipnosis: req.body.Sipnosis,
                        Year: req.body.Year,
                        TotalPages: req.body.TotalPages,
                        Edition: req.body.Edition,
                        Publisher: req.body.Publisher,
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    //Check if a file was uploaded and update the 'cover' field accordingly
                    if (req.file) {
                        book.cover = req.file.path; // Assuming 'path' contains the path to the uploaded file
                    }
                    return [4 /*yield*/, books_1.default.create(book)];
                case 2:
                    newbook = _a.sent();
                    res.status(201).json(newbook);
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _a.sent();
                    res.status(400).json({ message: err_2 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// GET BOOK 
function getBookById(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var book, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, books_1.default.findById(req.params.id)];
                case 1:
                    book = _a.sent();
                    if (book == null) {
                        return [2 /*return*/, res.status(404).json({ message: 'Can not find book' })];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    err_3 = _a.sent();
                    return [2 /*return*/, res.status(500).json({ message: err_3 })];
                case 3:
                    res.book = book;
                    next();
                    return [2 /*return*/];
            }
        });
    });
}
// UPDATE BOOK
function updateBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var updateBook_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(req.body.Name != null)) return [3 /*break*/, 4];
                    res.book.Name = req.body.Name;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, res.book.save()];
                case 2:
                    updateBook_1 = _a.sent();
                    res.json(updateBook_1);
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    res.status(400).json({ message: error_1 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
// DELETE BOOK
function deleteBook(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.id;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, res.book.deleteOne({ id: id })];
                case 2:
                    _a.sent();
                    res.json({ message: 'book deleted' });
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    res.status(500).json({ message: err_4 });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
module.exports = { getAllBooks: getAllBooks, createBook: createBook, upload: exports.upload, getBookById: getBookById, updateBook: updateBook, deleteBook: deleteBook };
