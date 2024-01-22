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

### MongoDB Atlas Connection String

Connect to your MongoDB Atlas cluster using the following connection string:

`mongodb+srv://<username>:<password>@<cluster-address>/<database-name>`

Replace the following placeholders:

`<username>`: Your MongoDB Atlas username.

`<password>`: Your MongoDB Atlas password.

`<cluster-address>`: The address of your MongoDB Atlas cluster.

`<database-name>`: The name of the MongoDB database you want to connect to.

#### Example

```http
mongodb+srv://myuser:mypassword@cluster0.mongodb.net/mydatabase
```

4. Run docker command

```bash
docker-compose up
```

If the terminal returns the error

```bash
permission denied while trying to connect to the Docker daemon socket
```

Run the command again with sudo

```bash
sudo docker-compose up
```

5. This To-Do List API should be running locally at `http://localhost:3012/api`

## Running the tests

To run the tests, run the following command

```bash
docker exec -it backend-backendapp-1 bash
```

If the terminal returns the error

```bash
permission denied while trying to connect to the Docker daemon socket
```

Run the command again with sudo

```bash
sudo docker exec -it backend-backendapp-1 bash
```

and then run the following command

```bash
npm test
```

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
  "backgroundColor": "white",
  "textColor": "black"
}
```

##### Response:

```json
{
  "_id": "unique_todo_id",
  "title": "Task Title",
  "description": "Task Description",
  "isFavorite": false,
  "backgroundColor": "white",
  "textColor": "black"
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
    "backgroundColor": "white",
    "textColor": "black"
  },
  {
    "_id": "unique_todo_id_2",
    "title": "Task 2",
    "description": "Description 2",
    "isFavorite": true,
    "backgroundColor": "white",
    "textColor": "black"
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
  "backgroundColor": "white",
  "textColor": "black"
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
  "backgroundColor": "white",
  "textColor": "black"
}
```

#### Response

```json
{
  "_id": "unique_todo_id",
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "isFavorite": true,
  "backgroundColor": "black",
  "textColor": "white"
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
  "backgroundColor": "white",
  "textColor": "black"
}
```

### 7. Set BackgroundColor for a Todo

```http
PUT /todos/:id/color
```

#### Request Body

```json
{
  "backgroundColor": "gray"
}
```

#### Response

```json
{
  "_id": "unique_todo_id",
  "title": "Task Title",
  "description": "Task Description",
  "isFavorite": false,
  "backgroundColor": "gray",
  "textColor": "white"
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
    "backgroundColor": "white",
    "textColor": "black"
  }
  // ... other favorite todos
]
```

### 9. Get All Todos with a Specific BackgroundColor

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
    "backgroundColor": "black",
    "textColor": "khaki"
  },
  {
    "_id": "unique_todo_id_3",
    "title": "Task 3",
    "description": "Description 3",
    "isFavorite": false,
    "backgroundColor": "black",
    "textColor": "gray"
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

#### 500 Validation Error:

For validation erros.
Case Missing title:

```json
{
  "error": "Validation Error",
  "details": ["Missing title"]
}
```

Case Missing description:

```json
{
  "error": "Validation Error",
  "details": ["Missing description"]
}
```

#### 400 Invalid Color

When searching for an invalid color

```json
{
  "error": "Invalid Color"
}
```

#### 400 Providing invalid colors

When the user try to provide an invalid color to update

```json
{
  "error": "Invalid Color(s)",
  "details": "Please provide valid values for backgroundColor and textColor."
}
```

###

## Additional Notes

- Colors can be specified as strings (valid colors: "black", "palegoldenrod", "lightpink", "peachpuff", "white", "lavender", "gray", "lightskyblue", "khaki", "gainsboro").
- To filter by favorites, use the `/todos/favorites` endpoint.
- To filter by backgroundColor, use the `/todos/color/:color` endpoint.
