// express web server
import express from "express"
const api = express()
api.use(express.json()) // middleware för att kunna ta emot JSON i POST, etc.

// mongoose database connector & ODM for mongodb
import mongoose from "mongoose"
import { mongoURL } from "./secrets.js"
const connection = mongoURL

// start web server 
api.listen(3000, () => {
    // and connect to database
    mongoose.connect(connection, { dbName: 'BookFinder' })
    console.log("Connected to http://localhost:3000")
})

// Use token bucket
import limitRequests from "./classes/TokenBucket.js"

api.use(limitRequests(1, 10)) // 1 request per second, max burst 10

// ROUTES

// books
import booksRouter from "./routes/books.js"
api.use("/api/books", booksRouter)

// authors
import authorsRouter from "./routes/authors.js"
api.use("/api/authors", authorsRouter)

// genres
import genresRouter from "./routes/genres.js"
api.use("/api/genres", genresRouter)