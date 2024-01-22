const supertest = require("supertest");
const app = require("../src/app");
const Todo = require("../src/models/Todo");

const request = supertest(app);

describe("Todo API Tests", () => {
  let createdTodoId;

  afterAll(async () => {
    await Todo.deleteMany();
  });

  it("should get all todos and handle no todos case", async () => {
    const res = await request.get("/api/todos");

    expect(res.status).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
    if (res.body.length === 0) {
      expect(res.body.message).toBe("No todos found yet");
    }
  });

  it("should create a new todo", async () => {
    const res = await request.post("/api/todos").send({
      title: "Test Todo",
      description: "Testing createTodo",
      isFavorite: false,
      backgroundColor: "black",
      textColor: "white",
    });

    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.title).toBe("Test Todo");

    createdTodoId = res.body._id;
  });

  it("should mark a todo as favorite", async () => {
    const res = await request.put(`/api/todos/${createdTodoId}/favorite`);
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.isFavorite).toBe(true);
  });

  it("should get all favorite todos", async () => {
    const res = await request.get("/api/todos/favorites");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should handle validation error if required fields are missing", async () => {
    const res = await request.post("/api/todos").send({});

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Validation Error");
    expect(res.body.details).toEqual(["Missing title", "Missing description"]);
  });

  it("should handle internal server error in create route", async () => {
    jest
      .spyOn(Todo, "create")
      .mockRejectedValueOnce(new Error("Internal Server Error"));

    const res = await request.post("/api/todos").send({
      title: "Test Todo",
      description: "Testing createTodo",
      isFavorite: false,
      color: "red",
    });

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Internal Server Error");
  });

  it("should get all todos", async () => {
    const res = await request.get("/api/todos");

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should get a todo by ID", async () => {
    const res = await request.get(`/api/todos/${createdTodoId}`);

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body._id).toBe(createdTodoId);
  });

  it("should handle not found error if todo does not exist", async () => {
    jest.spyOn(Todo, "findById").mockResolvedValueOnce(null);

    const nonExistentTodoId = "65a96cf436bb8ab8423cc961";
    const res = await request.get(`/api/todos/${nonExistentTodoId}`);

    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Todo not found");
  });

  it("should handle internal server error in findById route", async () => {
    jest
      .spyOn(Todo, "findById")
      .mockRejectedValueOnce(new Error("Internal Server Error"));

    const invalidTodoId = "invalidTodo123";
    const res = await request.get(`/api/todos/${invalidTodoId}`);

    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Internal Server Error");
  });

  it("should get todos by backgroundColor", async () => {
    const res = await request.get("/api/todos/color/black");
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should handle invalid color error", async () => {
    const invalidColor = "invalidcolor";
    const res = await request.get(`/api/todos/color/${invalidColor}`);

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid color");
  });

  it("should update a todo", async () => {
    const res = await request.put(`/api/todos/${createdTodoId}`).send({
      title: "Updated Todo",
      description: "Updated description",
      isFavorite: false,
      backgroundColor: "blue",
      textColor: "white",
    });

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.title).toBe("Updated Todo");
    expect(res.body.isFavorite).toBe(false);
    expect(res.body.backgroundColor).toBe("blue");
    expect(res.body.textColor).toBe("white");
  });

  it("should get all favorites todos and handle no todos case", async () => {
    const res = await request.get("/api/todos/favorites");

    expect(res.status).toBe(404);
    expect(res.body).toBeInstanceOf(Object);
    if (res.body.length === 0) {
      expect(res.body.message).toBe("No favorites todos found yet");
    }
  });

  it("should set color for a todo", async () => {
    const res = await request.put(`/api/todos/${createdTodoId}/color`).send({
      backgroundColor: "white",
      textColor: "black",
    });

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.backgroundColor).toBe("white");
    expect(res.body.textColor).toBe("black");
  });

  it("should handle invalid color error", async () => {
    const invalidBackgroundColor = "invalidcolor";
    const invalidTextColor = "invalidcolor";

    const res = await request.put(`/api/todos/${createdTodoId}/color`).send({
      backgroundColor: invalidBackgroundColor,
      textColor: invalidTextColor,
    });

    expect(res.status).toBe(400);
    expect(res.body.error).toBe("Invalid color(s)");
  });

  it("should handle not found error if todo does not exist as favorite", async () => {
    const nonExistentTodoId = "65a9662368c5654d59d63d12";
    const res = await request.put(`/api/todos/${nonExistentTodoId}/favorite`);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe("Todo not found");
  });

  it("should handle internal server error in favorite route", async () => {
    jest
      .spyOn(Todo, "findById")
      .mockRejectedValueOnce(new Error("Internal Server Error"));

    const res = await request.put("/api/todos/validtodo123/favorite");
    expect(res.status).toBe(500);
    expect(res.body.error).toBe("Internal Server Error");
  });

  it("should delete a todo", async () => {
    const res = await request.delete(`/api/todos/${createdTodoId}`);

    expect(res.status).toBe(204);
  });
});
