// BOOKS
import { Books } from '../../routes/books.js'
import { faker } from '@faker-js/faker'
import { authors } from './generateAuthors.js'
import { genres } from './generateGenres.js'
import fs from 'fs'

let books = []
async function generateBooks(clear = true) {
    if (!clear) {
        return users = await Books.find()
    }
    // delete all
    await Books.deleteMany()

    // generate 100 books
    for (let i = 0; i < 100; i++) {
        const isPastDate = faker.datatype.boolean() // 50% chance of past date or future date
        const releaseDate = isPastDate // if past date, generate past date, else generate future date
            ? faker.date.past(15)
            : faker.date.future(2);
        const numOfAuthors = faker.datatype.number({ min: 1, max: 2 })
        const numOfGenres = faker.datatype.number({ min: 1, max: 3 })
        const book = new Books({
            title: faker.lorem.words(faker.datatype.number({ min: 1, max: 3 })),
            author: faker.helpers.uniqueArray(authors, numOfAuthors),
            genre: faker.helpers.uniqueArray(genres, numOfGenres),
            releaseDate: releaseDate,
            rating: faker.datatype.number({ min: 0, max: 5 })
        })
        try {
            await book.save()
            books.push(book)
        }
        catch (err) {
            console.log(err)
        }
    }
    console.log(`Generated ${books.length} books`)
}

async function generateBooksJson(clear = true) {
    if (!clear) {
        books = JSON.parse(fs.readFileSync('./json-mockdata/books.json'))
    }
    for (let i = 0; i < 20; i++) {
        const numOfAuthors = faker.datatype.number({ min: 1, max: 2 })
        const numOfGenres = faker.datatype.number({ min: 1, max: 3 })
        const book = {
            title: faker.lorem.words(faker.datatype.number({ min: 1, max: 3 })),
            author: faker.helpers.uniqueArray(authors, numOfAuthors),
            genre: faker.helpers.uniqueArray(genres, numOfGenres),
            releaseDate: faker.date.past(),
            rating: faker.datatype.number({ min: 0, max: 5 })
        }
        books.push(book)

    }
    console.log(`Generated ${books.length} books`)
    fs.writeFileSync('./json-mockdata/books.json', JSON.stringify(books, null, 4))
}

export { generateBooks, books, generateBooksJson }