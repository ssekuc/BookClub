import express from "express";
import mongoose from "mongoose";
import multer, { FileFilterCallback } from 'multer';
import path from 'path'
import Books from '../models/books'



// GET BOOK LIST
async function bookList(req: any, res: any) {

    try {
        const book = await Books.find()
        res.json(book)
    } catch (err) {
        res.status(500).json({ message: err })
    }

}

// Configure Multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Save uploaded files to the "uploads" folder
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      cb(null, Date.now() + ext); // Generate a unique filename
    },
  });
  

 export const upload = multer({ storage: storage, fileFilter(req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
      } else {
        cb(new Error('Only images are allowed'));
      }
     
 },  }).single('cover');
 
   

// CREATE BOOK
async function createBook(req: any, res: any) {


    const book = new Books({

        Name: req.body.Name,
        Author: req.body.Author,
        Sipnosis: req.body.Sipnosis,
        Year: req.body.Year,
        TotalPages: req.body.TotalPages,
        Edition: req.body.Edition,
        Publisher: req.body.Publisher,

    })

    try {
          //Check if a file was uploaded and update the 'cover' field accordingly
    if (req.file) {
        book.cover = req.file.path; // Assuming 'path' contains the path to the uploaded file
      }
        const newbook = await Books.create(book)
         res.status(201).json(newbook)
    } catch (err) {
        res.status(400).json({ message: err })
    }


}

// GET BOOK 
async function getBook(req: any, res: any, next: any) {
    let book
    try {
        book = await Books.findById(req.params.id)


        if (book == null) {
            return res.status(404).json({ message: 'Can not find book' }
            )
        }

    } catch (err) {

        return res.status(500).json({ message: err })

    }

    res.book = book
    next()

}

// UPDATE BOOK
async function updateBook(req: any, res: any) {
    if (req.body.Name != null) {

        res.book.Name = req.body.Name

        try {

            const updateBook = await res.book.save()
            res.json(updateBook)

        } catch (error) {
            res.status(400).json({ message: error })

        }

    }

}


// DELETE BOOK

async function deleteBook(req: any, res: any) {
    let id = req.params.id;

    try {

        await res.book.deleteOne({ id })
        res.json({ message: 'book deleted' })
    } catch (err) {

        res.status(500).json({ message: err })

    }
}

module.exports = {bookList,createBook,upload, getBook,updateBook,deleteBook };