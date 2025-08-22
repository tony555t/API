## Token Authentication API (Node.js)

A minimal JSON-file–backed REST API built with Node.js core `http` module. It demonstrates CRUD operations for books and a simple request authentication hook.

### Features
- **Native Node server**: no external web framework
- **Books CRUD**: `GET`, `POST`, `PUT`, `DELETE`
- **JSON storage**: data persisted to `token_authentication/db/*.json`
- **Ready-to-extend auth**: pluggable request authentication function

### Project Structure
```text
API/
  README.md
  token_authentication/
    server.js
    authentication.js (to be implemented)
    db/
      book.json
      user.json
    package.json
    package-lock.json
```

### Prerequisites
- Node.js v14+ (v18+ recommended)
- npm

### Setup
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO/API/token_authentication
npm install
```

### Run
```bash
node server.js
```
Server starts at `http://localhost:4000`.

### Authentication
- A placeholder `authenticate` function is wired in; implement your logic in `authentication.js` and ensure it is exported as `{ authenticate }`.
- Typical approach: validate an `Authorization: Bearer <token>` header.

### API
- Base URL: `http://localhost:4000`

#### GET /books
Returns all books.
```bash
curl -s http://localhost:4000/books | jq
```

#### POST /books
Creates a new book. The server assigns/increments `id`.
```bash
curl -s -X POST http://localhost:4000/books \
  -H 'Content-Type: application/json' \
  -d '{"title":"My Book","author":"Author","year":2025}'
```

#### PUT /books
Updates an existing book by `id`.
```bash
curl -s -X PUT http://localhost:4000/books \
  -H 'Content-Type: application/json' \
  -d '{"id":1, "title":"Updated Title"}'
```

#### DELETE /books/:id
Deletes a book by `id`.
```bash
curl -s -X DELETE http://localhost:4000/books/1
```

### Data Files
- `token_authentication/db/book.json`: books collection
- `token_authentication/db/user.json`: sample users (not yet used by the API)

### Notes
- This project uses the native Node `http` server (not Express).
- Ensure data files contain valid JSON and each book has a unique numeric `id`.

### License
ISC
