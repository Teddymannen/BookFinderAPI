# Documentation

- [Documentation](#documentation)
  - [Authentication and Authorization](#authentication-and-authorization)
  - [Endpoint Structure](#endpoint-structure)
  - [Request Parameters](#request-parameters)
    - [Endpoint for creating a new book.](#endpoint-for-creating-a-new-book)
    - [Endpoint for creating a new author.](#endpoint-for-creating-a-new-author)
    - [Endpoint for creating a new genre.](#endpoint-for-creating-a-new-genre)
  - [Request Examples](#request-examples)
    - [Post new book](#post-new-book)
    - [Get all books](#get-all-books)
    - [Get all books with a rating of 5](#get-all-books-with-a-rating-of-5)
    - [Get all books with a rating of 4 and a genre of fantasy](#get-all-books-with-a-rating-of-4-and-a-genre-of-fantasy)
    - [Get all books sorted by rating in descending order](#get-all-books-sorted-by-rating-in-descending-order)
    - [Get all books sorted by rating in descending order and title in ascending order](#get-all-books-sorted-by-rating-in-descending-order-and-title-in-ascending-order)
    - [Get all books sorted by rating in descending order on page 2 with 8 books per page](#get-all-books-sorted-by-rating-in-descending-order-on-page-2-with-8-books-per-page)
    - [Get a specific book](#get-a-specific-book)
    - [Update a specific book](#update-a-specific-book)
    - [Delete a specific book](#delete-a-specific-book)
  - [Response Structure](#response-structure)
    - [Books](#books)
    - [Authors](#authors)
    - [Genres](#genres)
  - [Response Examples](#response-examples)
    - [Get all books. (Success. Status: 200)](#get-all-books-success-status-200)
    - [Get all books. (Failure. Status: 404)](#get-all-books-failure-status-404)
    - [Post new book. (Success. Status: 201)](#post-new-book-success-status-201)
    - [Post new book. (Failure. Status: 400)](#post-new-book-failure-status-400)
    - [Get a specific book by id. (Success. Status: 200)](#get-a-specific-book-by-id-success-status-200)
    - [Get a specific book by id. (Failure. Status: 404)](#get-a-specific-book-by-id-failure-status-404)
    - [Update a book by id. (Success. Status: 200)](#update-a-book-by-id-success-status-200)
    - [Update a book by id. (Failure. Status: 500)](#update-a-book-by-id-failure-status-500)
    - [Delete a book by id. (Success. Status: 200)](#delete-a-book-by-id-success-status-200)
    - [Delete a book by id. (Failure. Status: 400)](#delete-a-book-by-id-failure-status-400)
  - [Error Handling](#error-handling)
  - [Rate Limiting and Throttling](#rate-limiting-and-throttling)

## Authentication and Authorization

To access the BookFinder API you need a MongoDB connection string for the BookFinder database. 

The MongoDB connection string looks like this:

`mongodb+srv://<username>:<password>@bookfinder.dms8kzw.mongodb.net/test` 

We build the string in secrets.js.placeholder and rename it to secrets.js.

Username and password is sent to you by email.

## Endpoint Structure

The base URL: `http://localhost:3000/api/`

The API has the following endpoints:
 
- Endpoints: 
    - `GET /{collection}` - get all documents in a collection
    - `GET /{collection}/{id}` - get a single document by id
    - `POST /{collection}` - create a new document
    - `PUT /{collection}/{id}` - update a document by id
    - `DELETE /{collection}/{id}` - delete a document by id

- Collections: 
    - `books`
    - `authors`
    - `genres`

## Request Parameters

When using PUT requests, you only need to send the parameters you want to update. Otherwise the parameters below are the same.

### Endpoint for creating a new book.

`POST /books`

| Parameter   | Description                  | Data type | Required | Constraints        |
| ----------- | ---------------------------- | --------- | -------- | ------------------ |
| title       | The title of the book        | string    | yes      |
| author      | The author of the book       | array     | no       |
| genre       | The genre of the book        | array     | yes      | at least one genre |
| releaseDate | The release date of the book | date      | no       |
| rating      | The rating of the book       | number    | no       | 0-5                |

### Endpoint for creating a new author. 

`POST /authors`

| Parameter | Description              | Data type | Required | Constraints |
| --------- | ------------------------ | --------- | -------- | ----------- |
| name      | The name of the author   | string    | yes      |
| age       | The age of the author    | number    | no       | 0-120       |
| alive     | The status of the author | boolean   | no       |

### Endpoint for creating a new genre.

`POST /genres`

| Parameter | Description           | Data type | Required | Constraints    |
| --------- | --------------------- | --------- | -------- | -------------- |
| genre     | The genre of the book | string    | yes      | must be unique |

`GET /books?{parameter}={value}`

| Parameter   | Description                                                        | Data type | Required | Constraints                                                                                                                                                                                        |
| ----------- | ------------------------------------------------------------------ | --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| page        | The page number                                                    | number    | no       |
| limit       | The number of documents per page                                   | number    | no       | must be a number or default value is used                                                                                                                                                          |
| title       | The title of the book                                              | string    | no       | case insensitive                                                                                                                                                                                   |
| author      | The author of the book                                             | string    | no       | case insensitive                                                                                                                                                                                   |
| genre       | The genre of the book                                              | string    | no       | case insensitive                                                                                                                                                                                   |
| releaseDate | The release date of the book                                       | date      | no       |
| rating      | The rating of the book                                             | number    | no       | 0-5                                                                                                                                                                                                |
| sort        | put a minus sign in front of the value to sort in descending order | string    | no       | Valid values: title, releaseDate, rating. Default value: title. Default order: ascending. Can sort by multiple values by separating them with an ampersand (&). Example: `sort=-rating&sort=title` |

`GET /authors?{parameter}={value}`

| Parameter | Description                                                        | Data type | Required | Constraints                                                                                                                                                                         |
| --------- | ------------------------------------------------------------------ | --------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| page      | The page number                                                    | number    | no       |
| limit     | The number of documents per page                                   | number    | no       | must be a number or default value is used                                                                                                                                           |
| name      | The name of the author                                             | string    | no       | case insensitive                                                                                                                                                                    |
| minAge    | The minimum age of the author                                      | number    | no       | 0-120                                                                                                                                                                               |
| maxAge    | The maximum age of the author                                      | number    | no       | 0-120                                                                                                                                                                               |
| alive     | The status of the author                                           | boolean   | no       |
| sort      | put a minus sign in front of the value to sort in descending order | string    | no       | Valid values: name, age, alive. Default value: name. Default order: ascending. Can sort by multiple values by separating them with an ampersand (&). Example: `sort=-age&sort=name` |

`GET /genres?{parameter}={value}`

| Parameter | Description                                                        | Data type | Required | Constraints                                                                                                                                                                                                                  |
| --------- | ------------------------------------------------------------------ | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| page      | The page number                                                    | number    | no       |
| limit     | The number of documents per page                                   | number    | no       | must be a number or default value is used                                                                                                                                                                                    |
| genre     | The genre of the book                                              | string    | no       | case insensitive                                                                                                                                                                                                             |
| sort      | put a minus sign in front of the value to sort in descending order | string    | no       | Valid values: genre. Default value: genre. Default order: ascending. Can sort by multiple values by separating them with an ampersand (&). Although, there is only one value to sort by in this case. Example: `sort=-genre` |

## Request Examples

The request examples work similarly for all endpoints.

### Post new book

`POST http://localhost:3000/api/books`

**Request body**
```json
{
    "title": "Lord of the rings",
    "author": ["64410ea760dfea55cbeca4d0", "64410ea760dfea55cbeca4d0"],
    "genre": ["644110ca60dfea55cbeca4df", "644112eb7b5d5ae395e755f8"],
    "releaseDate": "2020-12-31",
    "rating": 5
}
```

### Get all books

`GET http://localhost:3000/api/books`

### Get all books with a rating of 5

`GET http://localhost:3000/api/books?rating=5`

### Get all books with a rating of 4 and a genre of fantasy

`GET http://localhost:3000/api/books?rating=4&genre=fantasy`

### Get all books sorted by rating in descending order

`GET http://localhost:3000/api/books?sort=-rating`

### Get all books sorted by rating in descending order and title in ascending order

`GET http://localhost:3000/api/books?sort=-rating&sort=title`

### Get all books sorted by rating in descending order on page 2 with 8 books per page

`GET http://localhost:3000/api/books?page=2&limit=8&sort=-rating`

### Get a specific book

`GET http://localhost:3000/api/books/644112fa7b5d5ae395e755fa`

### Update a specific book

`PUT http://localhost:3000/api/books/644112fa7b5d5ae395e755fa`

**Request body**
```json
{
    "rating": 4
}
```

### Delete a specific book

`DELETE http://localhost:3000/api/books/644112fa7b5d5ae395e755fa`

## Response Structure

`GET` requests are populated with data from other collections while `POST`, `PUT` and `DELETE` only return the ids in the fields that reference another collection.

**`POST`**: Returns the newly created dokument

**`GET` collection**: Returns a list of dokuments

**`PUT`**: Returns the updated dokument

**`DELETE`**: Returns the deleted dokument

**`GET` id:**

### Books

`GET http://localhost:3000/api/books/{id}`

| property    | description                  | data type |
| ----------- | ---------------------------- | --------- |
| _id         | The id of the book           | string    |
| title       | The title of the book        | string    |
| author      | The author of the book       | array     |
| genre       | The genre of the book        | array     |
| releaseDate | The release date of the book | date      |
| rating      | The rating of the book       | number    |
| __v         | Version Key                  | number    |

### Authors

`GET http://localhost:3000/api/authors/{id}` 

| property | description              | data type |
| -------- | ------------------------ | --------- |
| _id      | The id of the author     | string    |
| name     | The name of the author   | string    |
| age      | The age of the author    | number    |
| alive    | The status of the author | boolean   |
| __v      | Version Key              | number    |

### Genres 

`GET http://localhost:3000/api/genres/{id}`

| property | description           | data type |
| -------- | --------------------- | --------- |
| _id      | The id of the genre   | string    |
| genre    | The genre of the book | string    |
| __v      | Version Key           | number    |

## Response Examples

### Get all books. (Success. Status: 200)

`GET http://localhost:3000/api/books`

**Response body**

```json
[
    {
        "_id": "644291e91b3fa7a38116df49",
        "title": "neque",
        "author": [
            {
                "_id": "644291e81b3fa7a38116df11",
                "name": "Dr. Maureen Gleichner",
                "age": 119,
                "alive": false,
                "__v": 0
            },
            {
                "_id": "644291e81b3fa7a38116df09",
                "name": "Oscar Dooley",
                "age": 97,
                "alive": true,
                "__v": 0
            }
        ],
        "genre": [
            {
                "_id": "644291e91b3fa7a38116df3e",
                "genre": "True Crime",
                "__v": 0
            },
            {
                "_id": "644291e91b3fa7a38116df3a",
                "genre": "Suspense and Thrillers",
                "__v": 0
            }
        ],
        "releaseDate": "2023-02-12T07:36:59.170Z",
        "rating": 3,
        "__v": 0
    },
    {
        "_id": "644291e91b3fa7a38116df4b",
        "title": "autem sint",
        "author": [
            {
                "_id": "644291e81b3fa7a38116def9",
                "name": "Geneva Murazik",
                "age": 15,
                "alive": true,
                "__v": 0
            },
            {
                "_id": "644291e81b3fa7a38116def0",
                "name": "Ms. Gregory Schumm DVM",
                "age": 113,
                "alive": false,
                "__v": 0
            }
        ],
        "genre": [
            {
                "_id": "644291e91b3fa7a38116df3c",
                "genre": "Travel",
                "__v": 0
            },
            {
                "_id": "644291e81b3fa7a38116df1e",
                "genre": "Cookbooks",
                "__v": 0
            }
        ],
        "releaseDate": "2022-06-16T05:14:05.858Z",
        "rating": 4,
        "__v": 0
    }
]
```

### Get all books. (Failure. Status: 404)

`GET http://localhost:3000/api/book` (Wrong endpoint)

```html
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>Error</title>
</head>

<body>
	<pre>Cannot GET /api/book</pre>
</body>

</html>
```

### Post new book. (Success. Status: 201)

`POST http://localhost:3000/api/books`

**Request body**

```json
{
    "title": "Test of the rings",
    "author": ["64410ea760dfea55cbeca4d0", "64410ea760dfea55cbeca4d0"],
    "genre": ["644110ca60dfea55cbeca4df"],
    "releaseDate": "2020-12-31",
    "rating": 5
}
```

**Response body**

```json
{
    "title": "Test of the rings",
    "author": [
        "64410ea760dfea55cbeca4d0",
        "64410ea760dfea55cbeca4d0"
    ],
    "genre": [
        "644110ca60dfea55cbeca4df"
    ],
    "releaseDate": "2020-12-31T00:00:00.000Z",
    "rating": 5,
    "_id": "644632cb0dea9fd7a6fa99bf",
    "__v": 0
}
```

### Post new book. (Failure. Status: 400)

`POST http://localhost:3000/api/books`

**Request body**

Missing genre

```json
{
    "title": "Test of the rings",
    "author": ["64410ea760dfea55cbeca4d0", "64410ea760dfea55cbeca4d0"],
    "releaseDate": "2020-12-31",
    "rating": 5
}
``` 

**Response body**

```json 
{
    "message": "books validation failed: genre: A book must have at least one genre"
}
```

### Get a specific book by id. (Success. Status: 200)

`GET http://localhost:3000/api/books/644291e91b3fa7a38116df6f`

**Response body**

```json
{
    "_id": "644291e91b3fa7a38116df6f",
    "title": "sint maiores",
    "author": [
        {
            "_id": "644291e81b3fa7a38116df09",
            "name": "Oscar Dooley",
            "age": 97,
            "alive": true,
            "__v": 0
        },
        {
            "_id": "644291e81b3fa7a38116def7",
            "name": "Edwin Harris",
            "age": 33,
            "alive": true,
            "__v": 0
        }
    ],
    "genre": [
        {
            "_id": "644291e91b3fa7a38116df32",
            "genre": "Satire",
            "__v": 0
        },
        {
            "_id": "644291e91b3fa7a38116df40",
            "genre": "Westerns",
            "__v": 0
        },
        {
            "_id": "644291e91b3fa7a38116df3e",
            "genre": "True Crime",
            "__v": 0
        }
    ],
    "releaseDate": "2022-07-14T19:10:07.600Z",
    "rating": 0,
    "__v": 0
}
```

### Get a specific book by id. (Failure. Status: 404)

`GET http://localhost:3000/api/books/aaaaaaaaaaaaaaaaaaaaaaaa`

**Response body**

```json
{
    "message": "Not found"
}
```

### Update a book by id. (Success. Status: 200)

`PUT http://localhost:3000/api/books/644632cb0dea9fd7a6fa99bf`

**Request body**

```json
{
    "author": ["644291e81b3fa7a38116deec"],
    "genre": ["644291e81b3fa7a38116df16"]
}
```

**Response body**

```json
{
    "_id": "644632cb0dea9fd7a6fa99bf",
    "title": "Test of the rings",
    "author": [
        "644291e81b3fa7a38116deec"
    ],
    "genre": [
        "644291e81b3fa7a38116df16"
    ],
    "releaseDate": "2020-12-31T00:00:00.000Z",
    "rating": 5,
    "__v": 0
}
```

### Update a book by id. (Failure. Status: 500)

`PUT http://localhost:3000/api/books/644632cb0dea9fd7a6fa99bf` 

**Request body**

```json
{
    "author": ["644291e81b3fa7a38116deec"],
    "genre": {} 
}
```
Must have at least one genre

**Response body**

```json
{
    "message": "Unexpected error"
}
```

### Delete a book by id. (Success. Status: 200)

`DELETE http://localhost:3000/api/books/644291e91b3fa7a38116df6f`

**Response body**

```json
{
    "_id": "644291e91b3fa7a38116df6f",
    "title": "sint maiores",
    "author": [
        "644291e81b3fa7a38116df09",
        "644291e81b3fa7a38116def7"
    ],
    "genre": [
        "644291e91b3fa7a38116df32",
        "644291e91b3fa7a38116df40",
        "644291e91b3fa7a38116df3e"
    ],
    "releaseDate": "2022-07-14T19:10:07.600Z",
    "rating": 0,
    "__v": 0
}
```

### Delete a book by id. (Failure. Status: 400)

`DELETE http://localhost:3000/api/books/644291e91b3fa7a38116df4_123123123`

**Response body**

```json
{
    "message": "Invalid ID"
}
```

## Error Handling

| Error message    | Description                  | Possible solution                                               |
| ---------------- | ---------------------------- | --------------------------------------------------------------- |
| Not found        | The resource was not found   | Check the resource ID                                           |
| Invalid ID       | The resource ID is invalid   | Check the resource ID                                           |
| Unexpected error | An unexpected error occurred | Contact the API provider (or check the logs if you have access) |
| Validation error | The request body is invalid  | Check the request body                                          |

## Rate Limiting and Throttling

The API has a rate limit of 2 requests per second, with a maximum burst of 50 requests. This means that the API can handle 2 requests per second on average, but if there's a sudden surge of requests, it can handle up to 50 requests in a short period of time.

To achieve this rate limiting, the code uses a "token bucket" algorithm implemented by the TokenBucket class. This algorithm works by maintaining a bucket with a fixed capacity of tokens (in this case, 50 tokens). Tokens are added to the bucket at a fixed rate (in this case, 2 tokens per second), up to the bucket's maximum capacity.

Whenever a new request arrives, the code checks if there are any tokens available in the bucket. If there are, it means that the API can handle the request and the token is removed from the bucket to indicate that a request has been made. If there are no tokens available, it means that the API has hit its rate limit and the request is rejected with a 429 status code and a message indicating that the rate limit has been exceeded.