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

// GET /books
booksRouter.get('/', async (req, res) => {
    Books.find()
        .populate('author')
        .populate('genre')
        .then(books => {
            res.send(books) // return all books
        })
        .catch(err => {
            const error = unexpectedError()
            res.status(error.status).send({ message: error.message })
        })
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