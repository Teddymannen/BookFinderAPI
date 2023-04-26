// create a sub router for the authors route
import Router from 'express'
const authorsRouter = Router()
import { notFoundError, invalidIdError, unexpectedError } from '../error-messages/error-messages.js'

// import mongoose and Schema so we can create schemas and query our collection
import mongoose, { Schema } from 'mongoose'

// create author Schema
const authorSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 0, max: 120 },
    alive: Boolean
})

// create collection model
export const Authors = mongoose.model('authors', authorSchema)

// define routes

// POST /authors
authorsRouter.post('/', async (req, res) => {
    const author = new Authors(req.body)
    author.save()
        .then(author => {
            res.send(author); // return the new author
        })
        .catch(err => {
            const error = unexpectedError()
            res.status(error.status).send({ message: error.message })
        })
})

// GET /authors
authorsRouter.get('/', async (req, res) => {
    const perPage = parseInt(req.query.limit) || 5
    const page = req.query.page - 1 || 0

    let sort = req.query.sort || 'name' // default sort by name
    if (typeof sort === 'string') { // if sort is a string, convert it to an array
        sort = [sort]
    }
    const joinSort = sort.join(' ') // join the array into a string

    Authors.find({
        // Search by name, age, and/or alive. If no query is provided, return all authors. 
        //
        // search for authors with a name that contains the query. Case insensitive.
        // if the query is not provided, it will be ignored
        name: { $regex: req.query.name || '', $options: 'i' },
        // search for age higher than or lower than a certain value.
        // if the query is not provided, it will be ignored
        age: { $gte: req.query.minAge || 0, $lte: req.query.maxAge || 120 },
        // search for authors that are alive or dead
        // if the query is not provided, it will be ignored. 
        alive: req.query.alive || { $in: [true, false] }
    })
        .sort(joinSort)
        .limit(perPage)
        .skip(perPage * page)
        .then(authors => {
            res.send(authors)
        })
        .catch(err => {
            const error = unexpectedError()
            res.status(error.status).send({ message: error.message })
        })
    res.header('Page', page + 1)
})
// GET /authors/:id
authorsRouter.get('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        const error = invalidIdError()
        res.status(error.status).send({ message: error.message })
        return
    }
    Authors.findById(req.params.id)
        .then(author => {
            if (author) {
                res.send(author)
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

// PUT /authors/:id
authorsRouter.put('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        const error = invalidIdError()
        res.status(error.status).send({ message: error.message })
        return
    }
    Authors.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(author => {
            if (author) {
                res.send(author)
            } else {
                const error = notFoundError('Author')
                res.status(error.status).send({ message: error.message })
            }
        })
        .catch(err => {
            const error = unexpectedError()
            res.status(error.status).send({ message: error.message })
        })
})

// DELETE /authors/:id
authorsRouter.delete('/:id', async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        const error = invalidIdError()
        res.status(error.status).send({ message: error.message })
        return
    }
    Authors.findByIdAndDelete(req.params.id)
        .then(author => {
            if (author) {
                res.send(author)
            } else {
                const error = notFoundError('Author')
                res.status(error.status).send({ message: error.message })
            }
        })
        .catch(err => {
            const error = unexpectedError()
            res.status(error.status).send({ message: error.message })
        })
})


export default authorsRouter