# Documentation




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

*For each endpoint, list all required and optional parameters, their data types, and a brief description of their purpose. Include any constraints or validation rules for the parameters.*

When using PUT requests, you only need to send the parameters you want to update. Otherwise the parameters below are the same.

### Endpoint for creating a new book.

`POST /books`

Parameter | Description | Data type | Required | Constraints
--- | --- | --- | --- | ---
title | The title of the book | string | yes |
author | The author of the book | array | no |
genre | The genre of the book | array | yes | at least one genre
releaseDate | The release date of the book | date | no |
rating | The rating of the book | number | no | 0-5

### Endpoint for creating a new author. 

`POST /authors`

Parameter | Description | Data type | Required | Constraints
--- | --- | --- | --- | ---
name | The name of the author | string | yes |
age | The age of the author | number | no | 0-120
alive | The status of the author | boolean | no |

### Endpoint for creating a new genre.

`POST /genres`

Parameter | Description | Data type | Required | Constraints
--- | --- | --- | --- | ---
genre | The genre of the book | string | yes | must be unique

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

*Describe the structure of the API response, including the format (JSON, XML, etc.) and the various elements within the response. Explain the meaning of each element and any possible values.*

## Response Examples

*Provide example responses for each endpoint, showcasing both successful and error scenarios. These examples should help developers understand what to expect when interacting with the API.*

## Error Handling

*List all possible error codes and their meanings, along with guidance on how to handle these errors in the client application. This will help developers troubleshoot issues and create more robust applications.*

## Rate Limiting and Throttling

*If the API enforces rate limiting or throttling, explain the limitations and how developers can monitor their usage to avoid being blocked or receiving error responses.*