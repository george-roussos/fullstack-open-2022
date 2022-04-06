const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./tests_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("sekret", 10);
  const user = new User({ username: "root", passwordHash, password: "12345" });

  await user.save();
});

describe("when there is initially one user in db", () => {
  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe("when a user is created", () => {
  test("creation succeeds only if username and password are 3 characters long", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "jw",
      name: "Jenny Wesslau",
      password: "123456789",
    };

    const result = await api.post("/api/users").send(newUser).expect(400);
    console.log(`Your error is ${result}`);

    expect(result.body.error).toContain(
      "Username and password must be longer than 3 characters"
    );
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("username must be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});
