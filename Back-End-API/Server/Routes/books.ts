

import express from 'express';
import { upload } from '../controllers/book';
const router = express.Router();


const bookController = require('../controllers/book')



// GET BOOK LIST
router.get('/books/list', bookController.bookList)

//CREATE A NEW BOOK
router.post('/books/create', upload, bookController.createBook)


//MILDWARE 
router.get('/api/getbook/:id', bookController.getBook, (req: any, res: any) => {
    res.json(res.book)

})

//UPDATE BOOK 
router.patch('/api/updatebook/:id', bookController.getBook, bookController.updateBook)

//DELETE BOOK 
router.delete('/api/deletebook/:id', bookController.getGame, bookController.deleteBook)





module.exports = router

export default router;