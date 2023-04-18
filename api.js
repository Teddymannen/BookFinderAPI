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

// authors

// genres