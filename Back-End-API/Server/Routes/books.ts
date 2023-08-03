

import express from 'express';
const router = express.Router();

const bookController = require('../controllers/book')





// GET BOOK LIST
router.get('/books/list', bookController.bookList)

//CREATE A NEW BOOK
router.post('/books/create', bookController.createBook)

















module.exports = router

export default router;