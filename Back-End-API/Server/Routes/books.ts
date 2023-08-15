

import express from 'express';
import { upload } from '../controllers/book';
const router = express.Router();


const bookController = require('../controllers/book')
import { AuthGuard } from '../utils/index';



/* Display Books List Page */
router.get('/books', AuthGuard, bookController.DisplayBookListPage);



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





module.exports = router

export default router;