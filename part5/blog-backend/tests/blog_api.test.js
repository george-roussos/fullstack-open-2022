const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlog = [
  {
    title: "my first blog post",
    author: "george",
    url: "dummy",
    likes: 5,
    id: "62385f217d76da5ce81bb423",
  },
  {
    title: "my fourth post",
    author: "george",
    url: "dummy",
    likes: 5,
    id: "62386d5dae9375ade289adcf",
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlog[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlog[1]);
  await blogObject.save();
});

describe("when some blog posts do exist", () => {
  test("GET request to blogs works", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body).toHaveLength(2);
  });

  test("all posts have id property", async () => {
    const response = await api.get("/api/blogs");
    expect(response.body[0].id).toBeDefined();
  });

  test("sending a DELETE request works", async () => {
    await api.delete("/api/blogs/62385f257d76da5ce81bb425").expect(204);
  });

  test("sending a PUT request works", async () => {
    const update = {
      likes: 19,
    };
    await api.put("/api/blogs/62386d5dae9375ade289adcf", update).expect(200);
  });
});

describe("addition of a new entry", () => {
  test("works with or without likes", async () => {
    const initialResponse = await api.get("/api/blogs");
    const initialBlogs = initialResponse.body.map((r) => r);

    const newBlog = {
      title: "my test post",
      author: "george",
      url: "dummy",
    };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.title);

    expect(contents).toHaveLength(initialBlogs.length + 1);
    expect(contents).toContain("my test post");
    expect(response.body[response.body.length - 1].likes).toBeDefined();
  });

  test("does not work without a blog title", async () => {
    const newBlog = {
      author: "george",
      url: "dummy",
    };

    await api.post("/api/blogs").send(newBlog).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
