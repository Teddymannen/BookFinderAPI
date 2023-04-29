# BookFinderAPI
An API for finding books

- [BookFinderAPI](#bookfinderapi)
  - [Overview](#overview)
  - [Documentation](#documentation)
  - [Getting started](#getting-started)
  - [Generating json files](#generating-json-files)



## Overview

*Begin with a brief overview of the API, explaining its purpose, benefits, and target audience. This section should give readers a clear understanding of what the API does and why it exists.*

This API is designed to allow users to search and sort for books, authors, and genres. It was made as an assignment for the course "Technical data knowledge and database technology for testers" at the vocational university KYH, anywhere learning.

The API is built with Node.js and Express.js and uses a MongoDB database.


## Documentation

Link to documentation: [documentation.md](documentation/documentation.md)

## Getting started

Clone the repository to your local machine:

```bash
git clone https://github.com/Teddymannen/BookFinderAPI.git
```

Install the dependencies:

```bash
npm install
```

Edit the file "secrets.js.placeholder" and rename it to "secrets.js". 

Change the following values to your own (will be sent to you in a separate email):

`const atlasUsername = "change this to your username"`

`const atlasPassword = "change this to your password"`

Start the server:

```bash
npm start
```

The server will now be running on http://localhost:3000

## Generating json files

The API uses json files to store data. If you want to generate new data, you can run the following commands:

1. This will generate new data and save it to the database.
```bash  
npm run gen-data
```

2. This will generate new data and save it to json files in the folder "json-mockdata".
```bash
npm run gen-json
```

&#x26a0;&#xfe0f; The above commands will overwrite any existing data in the database and in the json files. So make sure you update your saved IDs from eventual tests. &#x26a0;&#xfe0f;