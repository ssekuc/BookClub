

import express = require("express");
import { upload } from '../controllers/book';
const router = express.Router();


const bookController = require('../controllers/book')

// GET BOOK LIST
router.get('/api/books', bookController.getAllBooks)

//CREATE A NEW BOOK
router.post('/api/books/create', upload, bookController.createBook)


//MILDWARE 
router.get('/api/book/:id', bookController.getBookById, (req: any, res: any) => {
    res.json(res.book)

})

//UPDATE BOOK 
router.patch('/api/book/update/:id', bookController.getBookById, bookController.updateBook)

//DELETE BOOK 
router.delete('/api/book/delete/:id', bookController.getBookById, bookController.deleteBook)

export default router;