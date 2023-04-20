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

// ROUTES

// books
import booksRouter from "./routes/books.js"
api.use("/books", booksRouter)

// authors
import authorsRouter from "./routes/authors.js"
api.use("/authors", authorsRouter)

// genres
import genresRouter from "./routes/genres.js"
api.use("/genres", genresRouter)