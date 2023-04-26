// create a sub router for the books route
import Router from 'express'
const booksRouter = Router()
import { notFoundError, invalidIdError, unexpectedError } from '../error-messages/error-messages.js'

// import mongoose and Schema so we can create schemas and query our collection
import mongoose, { Schema } from 'mongoose'

// create book Schema
const bookSchema = new Schema({
    title: { type: String, required: true },
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'authors' }],
    genre: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'genres',
        validate: {
            validator: function (v) {
                return v.length > 0
            },
            message: 'A book must have at least one genre'
        }
    },
    releaseDate: Date,
    rating: { type: Number, min: 0, max: 5 },
})

// create collection model
export const Books = mongoose.model('books', bookSchema)

// define routes

// POST /books
booksRouter.post('/', async (req, res) => {
    const book = new Books(req.body)
    book.save()
        .then(book => {
            res.send(book); // return the new book
        })
        .catch(err => {
            console.log(err) // for debugging
            if (err.name === 'ValidationError') {
                const error = err.message
                res.status(400).send({ message: error })
                return
            }
            else {
                const error = unexpectedError()
                res.status(error.status).send({ message: error.message })
            }
        })
})

import { Authors } from './authors.js' // import the authors model
import { Genres } from './genres.js' // import the genres model

// GET /books
booksRouter.get('/', async (req, res) => {
    const perPage = parseInt(req.query.limit) || 5
    const page = req.query.page - 1 || 0

    let sort = req.query.sort || 'title' // default sort by title
    if (typeof sort === 'string') { // if sort is a string, convert it to an array
        sort = [sort]
    }
    const joinSort = sort.join(' ') // join the sort array into a string

    let releaseDateSearch = {}
    if (req.query.releaseAfter) {
        releaseDateSearch.$gte = new Date(req.query.releaseAfter)
    }
    if (req.query.releaseBefore) {
        releaseDateSearch.$lte = new Date(req.query.releaseBefore)
    }
    if (Object.values(releaseDateSearch).length === 0) {
        releaseDateSearch = { $exists: true }
    }

    Books.find({
        // Search by title, author, genre, releaseDate, and/or rating. If no query is provided, return all books.
        //The search query is case insensitive and will return partial matches.

        // search for books with a title that contains the query. Case insensitive.
        title: req.query.title ? { $regex: req.query.title, $options: 'i' } : { $exists: true },
        // search for books with an author that contains the query. Case insensitive.
        author: req.query.author ? { $in: await Authors.find({ name: { $regex: req.query.author, $options: 'i' } }).select('_id') } : { $exists: true },
        // search for books with a genre that contains the query. Case insensitive.
        genre: req.query.genre ? { $in: await Genres.find({ genre: { $regex: req.query.genre, $options: 'i' } }).select('_id') } : { $exists: true },
        // search for books with a release date that matches the query
        releaseDate: releaseDateSearch,
        // search for books with a rating that matches the query
        rating: req.query.rating ? { $eq: req.query.rating } : { $exists: true }
    })
        .sort(joinSort)
        .limit(perPage)
        .skip(perPage * page)
        .populate('author')
        .populate('genre')
        .then(books => {
            res.send(books) // return all books
        })
        .catch(err => {
            const error = unexpectedError()
            console.log(err)
            res.status(error.status).send({ message: error.message })
        })
    res.header('Page', page + 1)
})

// GET /books/:id
booksRouter.get('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        const error = invalidIdError()
        res.status(error.status).send({ message: error.message })
        return
    }
    Books.findById(req.params.id)
        .populate('author')
        .populate('genre')
        .then(book => {
            if (book) {
                res.send(book) // return the book
            } else {
                const error = notFoundError()
                res.status(error.status).send({ message: error.message })
            }
        })
        .catch(err => {
            const error = unexpectedError()
            res.status(error.status).send({ message: error.message })
        })
})

// PUT /books/:id
booksRouter.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        const error = invalidIdError()
        res.status(error.status).send({ message: error.message })
        return
    }
    Books.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(book => {
            if (book) {
                res.send(book) // return the updated book
            } else {
                const error = notFoundError('Book')
                res.status(error.status).send({ message: error.message })
            }
        })
        .catch(err => {
            console.log(err) // for debugging
            if (err.name === 'ValidationError') {
                const error = err.message
                res.status(400).send({ message: error })
                return
            }
            else {
                const error = unexpectedError()
                res.status(error.status).send({ message: error.message })
            }
        })
})

// DELETE /books/:id
booksRouter.delete('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        const error = invalidIdError()
        res.status(error.status).send({ message: error.message })
        return
    }
    Books.findByIdAndDelete(req.params.id)
        .then(book => {
            if (book) {
                res.send(book) // return the deleted book
            } else {
                const error = notFoundError('Book')
                res.status(error.status).send({ message: error.message })
            }
        })
        .catch(err => {
            const error = unexpectedError()
            res.status(error.status).send({ message: error.message })
        })
})

export default booksRouter