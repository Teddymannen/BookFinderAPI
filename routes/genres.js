// create a sub router for the genres route
import Router from 'express'
const genresRouter = Router()
import { notFoundError, invalidIdError, unexpectedError } from '../error-messages/error-messages.js'

// import mongoose and Schema so we can create schemas and query our collection
import mongoose, { Schema } from 'mongoose'

// create genre Schema
const genreSchema = new Schema({
    genre: String
})

// create collection model
const Genres = mongoose.model('genres', genreSchema)

// define routes

// POST /genres
genresRouter.post('/', async (req, res) => {
    const genre = new Genres(req.body)
    genre.save()
        .then(genre => {
            res.send(genre); // return the new genre
        })
        .catch(err => {
            const error = unexpectedError()
            res.status(error.status).send({ message: error.message })
        })
})

// GET /genres
genresRouter.get('/', async (req, res) => {
    Genres.find()
        .then(genres => {
            res.send(genres)
        })
        .catch(err => {
            const error = unexpectedError()
            res.status(error.status).send({ message: error.message })
        })
})

// GET /genres/:id
genresRouter.get('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        const error = invalidIdError()
        res.status(error.status).send({ message: error.message })
        return
    }
    Genres.findById(req.params.id)
        .then(genre => {
            if (!genre) {
                const error = notFoundError()
                res.status(error.status).send({ message: error.message })
                return
            }
            res.send(genre)
        })
        .catch(err => {
            const error = unexpectedError()
            res.status(error.status).send({ message: error.message })
        })
})

// PUT /genres/:id
genresRouter.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        const error = invalidIdError()
        res.status(error.status).send({ message: error.message })
        return
    }
    Genres.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(genre => {
            if (!genre) {
                const error = notFoundError()
                res.status(error.status).send({ message: error.message })
                return
            }
            res.send(genre)
        })
        .catch(err => {
            const error = unexpectedError()
            res.status(error.status).send({ message: error.message })
        })
})

// DELETE /genres/:id
genresRouter.delete('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        const error = invalidIdError()
        res.status(error.status).send({ message: error.message })
        return
    }
    Genres.findByIdAndDelete(req.params.id)
        .then(genre => {
            if (!genre) {
                const error = notFoundError()
                res.status(error.status).send({ message: error.message })
                return
            }
            res.send(genre)
        })
        .catch(err => {
            const error = unexpectedError()
            res.status(error.status).send({ message: error.message })
        })
})


export default genresRouter