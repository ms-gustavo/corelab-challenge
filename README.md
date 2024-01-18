# To-Do List for CoreLab Challenge API Documentation

API for the challenge proposed by Corelab as a requirement for a Junior Developer position

## Author

- [@msgustavo](https://github.com/ms-gustavo)

## Stack used

**DataBase:** MongoDB

**ODM:** Mongoose

**Back-end:** Node, Express

## Base URL

http://localhost:3012/api

## Setup and Local Run

1. Clone the repository

```bash
git@github.com:ms-gustavo/corelab-challenge.git
```

2. Navigate to the project directory

```bash
cd corelab-challenge
```

3. Create an `.env` file:

- Copy the content of `.envexample` into a new file named `.env`
- Update the values in the `.env` file as needed.

4. Install dependencias

```bash
npm install
```

5. Start the server

```bash
npm start
```

6. This To-Do List API should be running locally at `http://localhost:3012/api`

## Running the tests

To run the tests, run the following command

```bash
  npm test
```

NOTE: The server cannot be already running on port 3012 or it will conflict

## API Documentation

### 1. Create a TODO

```http
  POST /todos
```

#### Request Body Example:

```json
{
  "title": "Task Title",
  "description": "Task Description",
  "isFavorite": false,
  "color": "blue"
}
```

##### Response:

```json
{
  "_id": "unique_todo_id",
  "title": "Task Title",
  "description": "Task Description",
  "isFavorite": false,
  "color": "blue"
}
```

### 2. Get All Todos

```http
GET /todos
```

#### Response

```json
[
  {
    "_id": "unique_todo_id_1",
    "title": "Task 1",
    "description": "Description 1",
    "isFavorite": false,
    "color": "red"
  },
  {
    "_id": "unique_todo_id_2",
    "title": "Task 2",
    "description": "Description 2",
    "isFavorite": true,
    "color": "green"
  }
  // ... other todos
]
```

### 3. Get a Specific Todo

```http
GET /todos/:id
```

#### Response

```json
{
  "_id": "unique_todo_id",
  "title": "Task Title",
  "description": "Task Description",
  "isFavorite": false,
  "color": "blue"
}
```

### 4. Update a Todo

```http
PUT /todos/:id
```

#### Request Body:

```json
{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "isFavorite": true,
  "color": "yellow"
}
```

#### Response

```json
{
  "_id": "unique_todo_id",
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "isFavorite": true,
  "color": "yellow"
}
```

### 5. Delete a Todo

```http
DELETE /todos/:id
```

#### Response:

```
No Content (204)
```

### 6. Mark a Todo as Favorite

```http
PUT /todos/:id/favorite
```

#### Response

```json
{
  "_id": "unique_todo_id",
  "title": "Task Title",
  "description": "Task Description",
  "isFavorite": true,
  "color": "blue"
}
```

### 7. Set Color for a Todo

```http
PUT /todos/:id/color
```

#### Request Body

```json
{
  "color": "purple"
}
```

#### Response

```json
{
  "_id": "unique_todo_id",
  "title": "Task Title",
  "description": "Task Description",
  "isFavorite": false,
  "color": "purple"
}
```

### 8. Get All Favorite Todos

```http
GET /todos/favorites
```

#### Response

```json
[
  {
    "_id": "unique_todo_id_2",
    "title": "Task 2",
    "description": "Description 2",
    "isFavorite": true,
    "color": "green"
  }
  // ... other favorite todos
]
```

### 9. Get All Todos with a Specific Color

```http
GET /todos/color/:color
```

#### Response

```json
[
  {
    "_id": "unique_todo_id_1",
    "title": "Task 1",
    "description": "Description 1",
    "isFavorite": false,
    "color": "red"
  },
  {
    "_id": "unique_todo_id_3",
    "title": "Task 3",
    "description": "Description 3",
    "isFavorite": false,
    "color": "red"
  }
  // ... other todos with the specified color
]
```

###

# Error Handling

#### 404 Not Found:

When a requested resource is not found.

```json
{
  "error": "Todo not found"
}
```

#### 500 Internal Server Error:

For other server-related errors.

```json
{
  "error": "Internal Server Error"
}
```

###

## Additional Notes

- Colors can be specified as strings (e.g., "red", "green").
- To filter by favorites, use the `/todos/favorites` endpoint.
- To filter by color, use the `/todos/color/:color` endpoint.
