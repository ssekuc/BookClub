

import express from 'express';
import { upload } from '../controllers/book';
const router = express.Router();


const bookController = require('../controllers/book')



// GET BOOK LIST
router.get('/api/books', bookController.getAllBooks)

//CREATE A NEW BOOK
router.post('/api/createbooks', upload, bookController.createBook)


//MILDWARE 
router.get('/api/getbook/:id', bookController.getBookById, (req: any, res: any) => {
    res.json(res.book)

})

//UPDATE BOOK 
router.patch('/api/updatebook/:id', bookController.getBookById, bookController.updateBook)

//DELETE BOOK 
router.delete('/api/deletebook/:id', bookController.getBookById, bookController.deleteBook)





module.exports = router

export default router;