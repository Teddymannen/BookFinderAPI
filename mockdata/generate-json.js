// Purpose: generate json files for mock data
import { generateAuthorsJson } from './collections/generateAuthors.js'
import { generateGenresJson } from './collections/generateGenres.js'
import { generateBooksJson } from './collections/generateBooks.js'

async function run() {
    // run generators
    await generateAuthorsJson() // false to not clear
    await generateGenresJson() // false to not clear
    await generateBooksJson() // false to not clear

    // shut down
    process.exit()
}
run()
