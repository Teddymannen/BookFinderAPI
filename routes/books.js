// create a sub router for the books route
import Router from 'express'
const booksRouter = Router()

// import mongoose and Schema so we can create schemas and query our collection
import mongoose, { Schema } from 'mongoose'

// create book Schema
const bookSchema = new Schema({
    title: String,
    author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'authors' }],
    genre: [{ type: mongoose.Schema.Types.ObjectId, ref: 'genres' }],
    releaseDate: Date,
    rating: Number
})

// create collection model
mongoose.model('books', bookSchema)

// define routes


export default booksRouter