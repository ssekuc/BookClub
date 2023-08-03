import express from "express";
import mongoose from "mongoose";
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
       // cover: req.body.cover

    })

    try {
        const newbook = await book.save()
         res.status(201).json(newbook)
    } catch (err) {
        res.status(400).json({ message: err })
    }


}


module.exports = {bookList,createBook };