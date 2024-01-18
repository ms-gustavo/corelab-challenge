const supertest = require("supertest");
const app = require("../src/app");
const Todo = require("../src/models/Todo");

const request = supertest(app);

describe("Todo API Tests", () => {
  let createdTodoId;

  afterAll(async () => {
    await Todo.deleteMany();
  });

  it("should create a new todo", async () => {
    const res = await request.post("/api/todos").send({
      title: "Test Todo",
      description: "Testing createTodo",
      isFavorite: false,
      color: "red",
    });

    expect(res.status).toBe(201);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.title).toBe("Test Todo");

    createdTodoId = res.body._id;
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

  it("should get todos by color", async () => {
    const res = await request.get("/api/todos/color/red");

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it("should update a todo", async () => {
    const res = await request.put(`/api/todos/${createdTodoId}`).send({
      title: "Updated Todo",
      description: "Updated description",
      isFavorite: true,
      color: "blue",
    });

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.title).toBe("Updated Todo");
    expect(res.body.isFavorite).toBe(true);
    expect(res.body.color).toBe("blue");
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

  it("should set color for a todo", async () => {
    const res = await request.put(`/api/todos/${createdTodoId}/color`).send({
      color: "green",
    });

    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Object);
    expect(res.body.color).toBe("green");
  });

  it("should delete a todo", async () => {
    const res = await request.delete(`/api/todos/${createdTodoId}`);

    expect(res.status).toBe(204);
  });
});
