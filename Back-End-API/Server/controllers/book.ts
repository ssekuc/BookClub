import express from "express";
import mongoose from "mongoose";
import multer, { FileFilterCallback } from 'multer';
import path from 'path'
import Books from '../models/books'
import { UserDisplayName  } from '../utils';



// GET BOOK LIST
async function getAllBooks(req: any, res: any) {

    try {
        const { query,  Year, Author, sort } = req.query;
        const filter = createFilter(query,  Year, Author );
        const book = await fetchBooks(filter, sort);
       // const book = await Books.find()
        res.json(book)
    } catch (err) {
        res.status(500).json({ message: err })
    }

}



// BOOK LIST FILTER BY NAME, YEAR AND AUTHOR
const createFilter = (query: any, Year: any, Author: any) => {

    const filter: any = {};

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
const fetchBooks = async (filter: any, sort: any) => {
    let query = Books.find(filter);

    if (sort === 'asc') {
        query = query.sort({ Name: 1 });
    } else if (sort === 'desc') {
        query = query.sort({ Name: -1 });
    }

    const book = await query.exec();
    return book;
};






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
async function getBookById(req: any, res: any, next: any) {
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








// EXPRESS FRONTEND




export async function DisplayBookListPage(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {


        const { name } = req.query;
        const filter = createFilter(name,  null, null );
        const books = await fetchBooks(filter, 'desc');
        // const booksCollection = await Books.find().exec();
       res.render('index', { title: 'Books', page: 'books', books: books, displayName: UserDisplayName(req) });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}


export async function DisplayBookCartPage(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    try {


        const { name } = req.query;
        const filter = createFilter(name,  null, null );
        const books = await fetchBooks(filter, 'desc');
       res.render('index', { title: 'Cart', page: 'books', books: books, displayName: UserDisplayName(req) });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}





// export function DisplayMovieListPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
// {
//     Books.find(function(err: any, booksCollection:any)
//     {
//       // Database error
//       if(err)
//       {
//         console.error(err.message);
//         res.end(err);
//       }
//       res.render('index', { title: 'Books', page: 'books', books: booksCollection, displayName:  UserDisplayName(req)  });
//     });
// }

// export function DisplayAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
// {
//   res.render('index', { title: 'Add', page: 'edit', movie: '', displayName:  UserDisplayName(req) })
// }

// export function DisplayEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
// {
//   let id = req.params.id;

//   // pass the id to the db and read the movie into the edit page
//   Movie.findById(id, {}, {}, function(err, movieToEdit)
//   {
//     if(err)
//     {
//       console.error(err);
//       res.end(err);
//     }

//     // show the edit view with the data
//     res.render('index', { title: 'Edit', page: 'edit', movie: movieToEdit, displayName:  UserDisplayName(req) })
//   });
// }

// export function ProcessAddPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
// {

//   console.log("primero");
//   // instantiate a new Movie to Add
//   let newMovie = new Movie
//   ({
//     "Name": req.body.movieName,
//     "Director": req.body.movieDirector,
//     "Year": req.body.movieYear,
//     "Rating": req.body.movieRating
//   });
//       console.log("Hola");
//   // Insert the new Movie object into the database (movies collection)
//   Movie.create(newMovie, function(err: CallbackError)
//   {
//     console.log("second");
//     if(err)
//     {
//       console.error(err);
//       res.end(err);
//     }

//     // new movie has been added -> refresh the movie-list
//     res.redirect('/movie-list');
//   })
// }

// export function ProcessEditPage(req: express.Request, res: express.Response, next: express.NextFunction): void 
// {
//   let id = req.params.id;

//   // instantiate a new Movie to Edit
//   let updatedMovie = new Movie
//   ({
//     "_id": id,
// //     "Name": req.body.movieName,
// //     "Director": req.body.movieDirector,
// //     "Year": req.body.movieYear,
// //     "Rating": req.body.movieRating
// //   });

// //   // update the movie in the database
// //   Movie.updateOne({_id: id}, updatedMovie, function(err: CallbackError)
// //   {
// //     if(err)
// //     {
// //       console.error(err);
// //       res.end(err);
// //     }

// //     // edit was successful -> go to the movie-list page
// //     res.redirect('/movie-list');
// //   });
// }

// export function ProcessDeletePage(req: express.Request, res: express.Response, next: express.NextFunction): void 
// {
// //   let id = req.params.id;

// //   // pass the id to the database and delete the movie
// //   Movie.remove({_id: id}, function(err: CallbackError)
// //   {
// //     if(err)
// //     {
// //       console.error(err);
// //       res.end(err);
// //     }

// //     // delete was successful
// //     res.redirect('/movie-list');
// //   });
// }








module.exports = {getAllBooks,createBook,upload, getBookById,updateBook,deleteBook, DisplayBookListPage,fetchBooks, createFilter };