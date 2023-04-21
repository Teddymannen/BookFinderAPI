// faker random data api
import { faker } from '@faker-js/faker'

// url to mongodb database
import { mongoURL } from '../secrets.js'
const connection = mongoURL

// mongoose database connector & ODM for mongodb
import mongoose from 'mongoose'

import { generateAuthors } from './collections/generateAuthors.js'
import { generateGenres } from './collections/generateGenres.js'
import { generateBooks } from './collections/generateBooks.js'

async function run() {
    // connect to db
    mongoose.connect(connection, { dbName: 'BookFinder' })

    // run generators
    await generateAuthors() // false to not clear
    await generateGenres() // false to not clear
    await generateBooks() // false to not clear

    // shut down
    process.exit()
}
run()
