# corelab-challenge

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>To-Do List for CoreLab Challenge API Documentation</title>
</head>

<body>

  <h1>To-Do List API Documentation</h1>

  <h2>Base URL</h2>
  <code>http://localhost:3012/api</code>

   <h2>Setup and Local Run</h2>
   1. Clone the repository
   <code>
   git@github.com:ms-gustavo/corelab-challenge.git
   </code>
   2. Navigate to the project directory
   <code>
   cd corelab-challenge
   </code>
   3. Create an <code>.env</code> file:
   - Copy the contents of <code>.envexample</code> into a new file named <code>.env</code>
   - Update the values in the <code>.env</code> file as needed.
   4. Install dependencies
   <code>npm install</code>
   5. Start the server
   <code>npm start</code>
   6. This To-Do List API should be running locally at <code>http://localhost:3012/api</code>

  <h2>Endpoints</h2>

  <h3>1. Create a Todo</h3>
  <h4>Endpoint</h4>
  <code>POST /todos</code>
  <h4>Request Body</h4>
  <code>
    {
      "title": "Task Title",
      "description": "Task Description",
      "isFavorite": false,
      "color": "blue",
    }
  </code>
  <h4>Response</h4>
  <code>
    {
      "_id": "unique_todo_id",
      "title": "Task Title",
      "description": "Task Description",
      "isFavorite": false,
      "color": "blue",
    }
  </code>

  <h3>2. Get All Todos</h3>
  <h4>Endpoint</h4>
  <code>GET /todos</code>
  <h4>Response</h4>
  <code>
    [
      {
        "_id": "unique_todo_id_1",
        "title": "Task 1",
        "description": "Description 1",
        "isFavorite": false,
        "color": "red",
      },
      {
        "_id": "unique_todo_id_2",
        "title": "Task 2",
        "description": "Description 2",
        "isFavorite": true,
        "color": "green",
      }
      // ... other todos
    ]
  </code>

  <h3>3. Get a Specific Todo</h3>
  <h4>Endpoint</h4>
  <code>GET /todos/:id</code>
  <h4>Response</h4>
 <code>
    {
  "_id": "unique_todo_id",
  "title": "Task Title",
  "description": "Task Description",
  "isFavorite": false,
  "color": "blue",
}
  </code>

   <h3>4. Update a Todo</h3>
  <h4>Endpoint</h4>
  <code>PUT /todos/:id</code>
  <h4>Request Body:</h4>
 <code>
   {
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "isFavorite": true,
  "color": "yellow",
}
  </code>
   <h4>Response</h4>
<code>
{
  "_id": "unique_todo_id",
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "isFavorite": true,
  "color": "yellow",
}
</code>

  <h3>5. Delete a Todo</h3>
  <h4>Endpoint</h4>
  <code>DELETE /todos/:id</code>
  <h4>Response: <strong>No Content(204)</strong></h4>

  <h3>6. Mark a Todo as Favorite</h3>
  <h4>Endpoint</h4>
  <code>PUT /todos/:id/favorite</code>
  <h4>Response</h4>
 <code>
   {
  "_id": "unique_todo_id",
  "title": "Task Title",
  "description": "Task Description",
  "isFavorite": true,
  "color": "blue",
}
  </code>

  <h3>7. Set Color for a Todo</h3>
  <h4>Endpoint</h4>
  <code>PUT /todos/:id/color</code>
  <h4>Request Body</h4>
 <code>
    {
  "color": "purple"
}
  </code>
   <h4>Response</h4>
<code>
{
  "_id": "unique_todo_id",
  "title": "Task Title",
  "description": "Task Description",
  "isFavorite": false,
  "color": "purple",
}
</code>
  <h3>8. Get All Favorite Todos
</h3>
  <h4>Endpoint</h4>
  <code>GET /todos/favorites</code>
  <h4>Response</h4>
 <code>
[
  {
    "_id": "unique_todo_id_2",
    "title": "Task 2",
    "description": "Description 2",
    "isFavorite": true,
    "color": "green",
  }
  // ... other favorite todos
]
  </code>

  <h3>9. Get All Todos with a Specific Color</h3>
  <h4>Endpoint</h4>
  <code>GET /todos/color/:color</code>
  <h4>Response</h4>
 <code>
[
  {
    "_id": "unique_todo_id_1",
    "title": "Task 1",
    "description": "Description 1",
    "isFavorite": false,
    "color": "red",
  },
  {
    "_id": "unique_todo_id_3",
    "title": "Task 3",
    "description": "Description 3",
    "isFavorite": false,
    "color": "red",
  }
  // ... other todos with the specified color
]
  </code>
  <h2>Error Handling</h2>

  <h3>404 Not Found:</h3>
  <p>When a requested resource is not found.</p>
  <code>
    {
      "error": "Todo not found"
    }
  </code>

  <h3>500 Internal Server Error:</h3>
  <p>For other server-related errors.</p>
  <code>
    {
      "error": "Internal Server Error"
    }
  </code>

  <h2>Additional Notes</h2>

  <ul>
    <li>Colors can be specified as strings (e.g., "red", "green").</li>
    <li>To filter by favorites, use the /todos/favorites endpoint.</li>
    <li>To filter by color, use the /todos/color/:color endpoint.</li>
  </ul>

</body>

</html>
