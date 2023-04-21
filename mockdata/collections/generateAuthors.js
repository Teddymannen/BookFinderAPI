// AUTHORS
import { Authors } from '../../routes/authors.js'
import { faker } from '@faker-js/faker'

let authors = []
async function generateAuthors(clear = true) {
    if (!clear) {
        return users = await Authors.find()
    }
    // delete all
    await Authors.deleteMany()

    // generate 20 authors
    for (let i = 0; i < 20; i++) {
        const author = new Authors({
            name: faker.name.fullName(),
            age: faker.datatype.number({ min: 15, max: 120 }),
            alive: faker.datatype.boolean()
        })
        try {
            await author.save()
            authors.push(author)
        }
        catch (err) {
            console.log(err)
        }
    }
    console.log(`Generated ${authors.length} authors`)
}

export { generateAuthors, authors }