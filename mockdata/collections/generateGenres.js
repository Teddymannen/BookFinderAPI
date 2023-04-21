// GENRES
import { Genres } from '../../routes/genres.js'
import fs from 'fs'

let genres = []
const allGenres = [
    "Action and Adventure", "Biography", "Children's", "Comics and Graphic Novels",
    "Cookbooks", "Crime and Detective", "Drama", "Essay", "Fantasy", "Historical Fiction",
    "Horror", "Mystery", "Poetry", "Romance", "Satire", "Science Fiction", "Self-help",
    "Short Stories", "Suspense and Thrillers", "Travel", "True Crime", "Westerns",
    "Young Adult", "Religion and Spirituality", "Science and Technology"]
async function generateGenres(clear = true) {
    if (!clear) {
        return genres = await Genres.find()
    }
    // delete all
    await Genres.deleteMany()

    // generate genres
    for (let i = 0; i < allGenres.length; i++) {
        const genre = new Genres({
            genre: allGenres[i]
        })
        try {
            await genre.save()
            genres.push(genre)
        }
        catch (err) {
            console.log(err)
        }
    }
    console.log(`Generated ${genres.length} genres`)
}

async function generateGenresJson(clear = true) {
    if (!clear) {
        genres = JSON.parse(fs.readFileSync('./json-mockdata/genres.json'))
    }
    for (let i = 0; i < allGenres.length; i++) {
        const genre = {
            genre: allGenres[i]
        }
        genres.push(genre)
    }
    console.log(`Generated ${genres.length} genres`)
    fs.writeFileSync('./json-mockdata/genres.json', JSON.stringify(genres, null, 4))
}

export { generateGenres, genres, generateGenresJson }