// BOOKS
import { Books } from '../../routes/books.js'
import { faker } from '@faker-js/faker'
import { authors } from './generateAuthors.js'
import { genres } from './generateGenres.js'

let books = []
async function generateBooks(clear = true) {
    if (!clear) {
        return users = await Books.find()
    }
    // delete all
    await Books.deleteMany()

    // generate 20 books
    for (let i = 0; i < 20; i++) {
        const numOfAuthors = faker.datatype.number({ min: 1, max: 2 })
        const numOfGenres = faker.datatype.number({ min: 1, max: 3 })
        const book = new Books({
            title: faker.lorem.words(faker.datatype.number({ min: 1, max: 3 })),
            author: faker.helpers.uniqueArray(authors, numOfAuthors),
            genre: faker.helpers.uniqueArray(genres, numOfGenres),
            releaseDate: faker.date.past(),
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

export { generateBooks, books }