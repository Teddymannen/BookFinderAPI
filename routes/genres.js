// create a sub router for the genres route
import Router from 'express'
const genresRouter = Router()

// import mongoose and Schema so we can create schemas and query our collection
import mongoose, { Schema } from 'mongoose'

// create genre Schema
const genreSchema = new Schema({
    genre: String
})

// create collection model
mongoose.model('genres', genreSchema)

// define routes


export default genresRouter